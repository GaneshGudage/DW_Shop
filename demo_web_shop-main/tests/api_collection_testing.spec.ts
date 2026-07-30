import { test, expect } from '@playwright/test';

const BASE_URL = 'https://fakestoreapi.com';

test.describe('Postman collection API tests', () => {
  test('GET /products/1 returns product details', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/1`);
    expect(response.status()).toBe(200);

    const product = await response.json();
    expect(product).toBeTruthy();
    expect(product).toHaveProperty('id', 1);
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('image');
    expect(product).toHaveProperty('rating');
    expect(product.rating).toHaveProperty('rate');
    expect(product.rating).toHaveProperty('count');
  });

  test('GET /products returns a list of products', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products`);
    expect(response.status()).toBe(200);

    const products = await response.json();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  test('POST /products creates a new product', async ({ request }) => {
    const newProduct = {
      title: 'QA Automation Book',
      price: 500,
      description: 'Book for learning API testing',
      image: 'https://example.com/book.jpg',
      category: 'books',
    };

    const response = await request.post(`${BASE_URL}/products`, {
      data: newProduct,
    });
    expect([200, 201]).toContain(response.status());

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe(newProduct.title);
    expect(body.price).toBe(newProduct.price);
    expect(body.category).toBe(newProduct.category);
  });

  test('PUT /products/1 updates existing product details', async ({ request }) => {
    const updateBody = {
      title: 'Updated Automation Testing Book',
      price: 600,
      description: 'Updated book for API testing',
      category: 'books',
      image: 'https://example.com/updated-book.jpg',
    };

    const response = await request.put(`${BASE_URL}/products/1`, {
      data: updateBody,
    });
    expect([200, 201]).toContain(response.status());

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body.title).toBe(updateBody.title);
    expect(body.price).toBe(updateBody.price);
    expect(body.category).toBe(updateBody.category);
  });

  test('PATCH /products/1 updates the price only', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/products/1`, {
      data: {
        price: 750,
      },
    });
    expect([200, 204]).toContain(response.status());

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body.price).toBe(750);
  });

  test('DELETE /products/1 deletes the product', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/products/1`);
    expect([200, 204]).toContain(response.status());

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
  });

  test('GET /products/categories returns available categories', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/categories`);
    expect(response.status()).toBe(200);

    const categories = await response.json();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  test('GET /products/category/jewelery returns jewelery products', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/category/jewelery`);
    expect(response.status()).toBe(200);

    const products = await response.json();
    expect(Array.isArray(products)).toBe(true);
    products.forEach((product: any) => {
      expect(product.category).toBe('jewelery');
    });
  });
});
