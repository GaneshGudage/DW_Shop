import { expect, Page } from '@playwright/test';

export class Product_page {
  readonly Page: Page;

  constructor(page: Page) {
    this.Page = page;
  }

  async login_to_site(username: string, password: string) {
    await this.Page.goto('https://demowebshop.tricentis.com/');
    await this.Page.getByRole('link', { name: 'Log in' }).click();
    await this.Page.getByRole('textbox', { name: 'Email:' }).fill(username);
    await this.Page.getByRole('textbox', { name: 'Password:' }).fill(password);
    await this.Page.locator(`//label[@for='RememberMe']`).click();
    await this.Page.getByRole('button', { name: 'Log in' }).click();
  };

  async Search_Product(product_name: string) {
    // Search and open product details
    await this.Page.locator('#small-searchterms').fill(product_name);
    await this.Page.getByRole('button', { name: 'Search' }).click();
    await this.Page.getByRole('link', { name: product_name, exact: true }).click();

  }

  async Add_product_to_cart() {
    await this.Page.locator(`//input[@class="button-1 add-to-cart-button"]`).click();
    console.log('Product Added In Cart')
  }

  async verify_product_added_to_cart() {
    const cart_list = this.Page.locator(`//span[@class='cart-label']`);
    await cart_list.nth(0).click();
    const product = this.Page.locator(`//a[@class='product-name']`);
    await expect(product.filter({ hasText: "Health Book" })).toBeVisible();
    console.log("Product found in cart")
  }

  async verify_Resent_Viewed(product_name: string) {
    // await this.Page.getByRole('img', { name: 'Tricentis Demo Web Shop' }).click();
    // const listItems = this.Page.locator('div.block-recently-viewed-products ul.list li');
    // const count = await listItems.count();
    // const resent_product = this.Page.locator(`//a[@class='product-name']`).nth(0).innerText();
    // await expect(resent_product).toContain(product_name);
    // for (let i = 0; i < count; i++) {
    // const text = await listItems.nth(i).innerText();
    // console.log(`List Item ${i + 1}: ${text.trim()}`);}

await this.Page.getByRole('img', { name: 'Tricentis Demo Web Shop'}).click();
const listItems = this.Page.locator('div.block-recently-viewed-products ul.list li');
await expect(listItems.first()).toBeVisible();
const firstProduct = listItems.nth(0);
console.log("Recently viewed:", await firstProduct.innerText());
await expect(firstProduct).toContainText(product_name);
  }

  async proceed_to_checkout() {
    await this.Page.locator('#termsofservice').click();
    await this.Page.locator(`//button[@id='checkout']`).click();

    await this.Page.locator(`//input[@class="button-1 new-address-next-step-button"]`).nth(0).click();
    await this.Page.locator(`//input[@class="button-1 new-address-next-step-button"]`).nth(1).click();
    await this.Page.locator(`//input[@class="button-1 shipping-method-next-step-button"]`).click();
    await this.Page.locator(`//input[@class="button-1 payment-method-next-step-button"]`).click();
    await this.Page.locator(`//input[@class="button-1 payment-info-next-step-button"]`).click();
    await this.Page.locator(`//input[@class="button-1 confirm-order-next-step-button"]`).click();
    await expect(this.Page.getByText('Your order has been')).toBeVisible();

  }

  async verify_ordered_product(){
    await this.Page.getByRole('link', {name: 'Orders'} ).click();
    await this.Page.locator(`//input[@class="button-2 order-details-button"]`).nth(0).click();
    await expect(this.Page.locator('div.section.products').getByText('Health Book', { exact: true })).toBeVisible();
  }

  }