import { test, expect } from '@playwright/test';
import { Product_page } from '../pages/productpage';

test('search product and add to cart', async ({ page }) => {
  const productPage = new Product_page(page);
  await productPage.login_to_site("qa.user123@mailinator.com", "Engineer@09876");
  await productPage.Search_and_add_product_to_cart("Health book");
  await productPage.verify_product_added_to_cart();
  await productPage.proceed_to_checkout();
  console.log("Product added to cart and checkout successful");
});

test('Verify_ordered_product', async({page}) => {
  const productPage = new Product_page(page);
  await productPage.login_to_site("qa.user123@mailinator.com", "Engineer@09876");
  await productPage.verify_ordered_product();
  console.log("Product added to cart sucessfully")
})
