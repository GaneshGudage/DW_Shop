# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demo_web_shop-main\tests\demows.spec.ts >> search product and add to cart
- Location: demo_web_shop-main\tests\demows.spec.ts:4:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('//a[@class=\'product-name\']').filter({ hasText: 'Health Book' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('//a[@class=\'product-name\']').filter({ hasText: 'Health Book' })

```

```yaml
- link "Tricentis Demo Web Shop":
  - /url: /
  - img "Tricentis Demo Web Shop"
- list:
  - listitem:
    - link "qa.user123@mailinator.com":
      - /url: /customer/info
  - listitem:
    - link "Log out":
      - /url: /logout
  - listitem:
    - link "Shopping cart (0)":
      - /url: /cart
  - listitem:
    - link "Wishlist (2)":
      - /url: /wishlist
- status
- textbox: Search store
- button "Search"
- list:
  - listitem:
    - link "Books":
      - /url: /books
  - listitem:
    - link "Computers":
      - /url: /computers
  - listitem:
    - link "Electronics":
      - /url: /electronics
  - listitem:
    - link "Apparel & Shoes":
      - /url: /apparel-shoes
  - listitem:
    - link "Digital downloads":
      - /url: /digital-downloads
  - listitem:
    - link "Jewelry":
      - /url: /jewelry
  - listitem:
    - link "Gift Cards":
      - /url: /gift-cards
- list:
  - listitem:
    - link "Cart":
      - /url: /cart
  - listitem: Address
  - listitem: Shipping
  - listitem: Payment
  - listitem: Confirm
  - listitem: Complete
- heading "Shopping cart" [level=1]
- text: Your Shopping Cart is empty!
- heading "Information" [level=3]
- list:
  - listitem:
    - link "Sitemap":
      - /url: /sitemap
  - listitem:
    - link "Shipping & Returns":
      - /url: /shipping-returns
  - listitem:
    - link "Privacy Notice":
      - /url: /privacy-policy
  - listitem:
    - link "Conditions of Use":
      - /url: /conditions-of-use
  - listitem:
    - link "About us":
      - /url: /about-us
  - listitem:
    - link "Contact us":
      - /url: /contactus
- heading "Customer service" [level=3]
- list:
  - listitem:
    - link "Search":
      - /url: /search
  - listitem:
    - link "News":
      - /url: /news
  - listitem:
    - link "Blog":
      - /url: /blog
  - listitem:
    - link "Recently viewed products":
      - /url: /recentlyviewedproducts
  - listitem:
    - link "Compare products list":
      - /url: /compareproducts
  - listitem:
    - link "New products":
      - /url: /newproducts
- heading "My account" [level=3]
- list:
  - listitem:
    - link "My account":
      - /url: /customer/info
  - listitem:
    - link "Orders":
      - /url: /customer/orders
  - listitem:
    - link "Addresses":
      - /url: /customer/addresses
  - listitem:
    - link "Shopping cart":
      - /url: /cart
  - listitem:
    - link "Wishlist":
      - /url: /wishlist
- heading "Follow us" [level=3]
- list:
  - listitem:
    - link "Facebook":
      - /url: http://www.facebook.com/nopCommerce
  - listitem:
    - link "Twitter":
      - /url: https://twitter.com/nopCommerce
  - listitem:
    - link "RSS":
      - /url: /news/rss/1
  - listitem:
    - link "YouTube":
      - /url: http://www.youtube.com/user/nopCommerce
  - listitem:
    - link "Google+":
      - /url: https://plus.google.com/+nopcommerce
- text: Powered by
- link "nopCommerce":
  - /url: http://www.nopcommerce.com/
- text: Copyright © 2026 Tricentis Demo Web Shop. All rights reserved.
```

# Test source

```ts
  1  | import { expect, Page } from '@playwright/test';
  2  | 
  3  | export class Product_page {
  4  |   readonly Page: Page;
  5  | 
  6  |   constructor(page: Page) {
  7  |     this.Page = page;
  8  |   }
  9  | 
  10 |   async login_to_site(username: string, password: string) {
  11 |     await this.Page.goto('https://demowebshop.tricentis.com/');
  12 |     await this.Page.getByRole('link', { name: 'Log in' }).click();
  13 |     await this.Page.getByRole('textbox', { name: 'Email:' }).fill(username);
  14 |     await this.Page.getByRole('textbox', { name: 'Password:' }).fill(password);
  15 |     await this.Page.locator(`//label[@for='RememberMe']`).click();
  16 |     await this.Page.getByRole('button', { name: 'Log in' }).click();
  17 |   };
  18 | 
  19 |   async Search_and_add_product_to_cart(product_name: string) {
  20 |     // Search for a product
  21 |     await this.Page.locator('#small-searchterms').fill(product_name);
  22 |     await this.Page.getByRole('button', { name: 'Search' }).click();
  23 |     await this.Page.getByRole('link', { name: 'Health Book', exact: true }).dblclick();
  24 |     await this.Page.locator(`//input[@class="button-1 add-to-cart-button"]`).click();
  25 |     console.log('Product Added In Cart')
  26 |   }
  27 | 
  28 |   async verify_product_added_to_cart() {
  29 |     const cart_list = this.Page.locator(`//span[@class='cart-label']`);
  30 |     await cart_list.nth(0).click();
  31 |     const product = this.Page.locator(`//a[@class='product-name']`);
> 32 |     await expect(product.filter({ hasText: "Health Book" })).toBeVisible();
     |                                                              ^ Error: expect(locator).toBeVisible() failed
  33 |     console.log("Product found in cart")
  34 |   }
  35 | 
  36 |   async proceed_to_checkout() {
  37 |     await this.Page.locator('#termsofservice').click();
  38 |     await this.Page.locator(`//button[@id='checkout']`).click();
  39 | 
  40 |     await this.Page.locator(`//input[@class="button-1 new-address-next-step-button"]`).nth(0).click();
  41 |     await this.Page.locator(`//input[@class="button-1 new-address-next-step-button"]`).nth(1).click();
  42 |     await this.Page.locator(`//input[@class="button-1 shipping-method-next-step-button"]`).click();
  43 |     await this.Page.locator(`//input[@class="button-1 payment-method-next-step-button"]`).click();
  44 |     await this.Page.locator(`//input[@class="button-1 payment-info-next-step-button"]`).click();
  45 |     await this.Page.locator(`//input[@class="button-1 confirm-order-next-step-button"]`).click();
  46 |     await expect(this.Page.getByText('Your order has been')).toBeVisible();
  47 | 
  48 |   }
  49 | 
  50 |   async verify_ordered_product(){
  51 |     await this.Page.getByRole('link', {name: 'Orders'} ).click();
  52 |     await this.Page.locator(`//input[@class="button-2 order-details-button"]`).nth(0).click();
  53 |     await expect(this.Page.locator('div.section.products').getByText('Health Book', { exact: true })).toBeVisible();
  54 |   }
  55 |   }
```