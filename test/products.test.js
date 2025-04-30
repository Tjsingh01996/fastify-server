// tests/products.test.js
const supertest = require("supertest");
const app = require("../app");

describe("Product API", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("GET /products should return 200 and array", async () => {
    const response = await supertest(app.server).get("/products");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.rows)).toBe(true);
  });

  

  test("POST /products should create a new product", async () => {
    const productData = {
      article_no: generateRandomString(10),
      product_service: "Test Product",
      price: 200,
      unit: "piece",
      in_stock: 50,
      description: "Testing description",
    };

    const response = await supertest(app.server)
      .post("/products")
      .send(productData);
    expect(response.statusCode).toBe(200);
    expect(response.body.article_no).toBe(productData.article_no);
  });

  test("PUT /products/:id should update an existing product", async () => {
    // Step 1: Create a new product first
    const initialData = {
      article_no: generateRandomString(10),
      product_service: "Initial Product",
      price: 100,
      unit: "piece",
      in_stock: 20,
      description: "Initial description",
    };

    const createResponse = await supertest(app.server)
      .post("/products")
      .send(initialData);
    console.log(" ====== ", createResponse);
    expect(createResponse.statusCode).toBe(200);
    const createdProduct = createResponse.body;

    // Step 2: Prepare updated data
    const updatedData = {
      article_no: createdProduct.article_no,
      product_service: "Updated Product",
      price: 150,
      unit: "box",
      in_stock: 99,
      description: "Updated description",
    };

    // Step 3: Call PUT /products/:id
    const updateResponse = await supertest(app.server)
      .put(`/products/${createdProduct.id}`)
      .send(updatedData);

    // Step 4: Assertions
    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.product_service).toBe("Updated Product");
    expect(updateResponse.body.price).toBe(150);
    expect(updateResponse.body.unit).toBe("box");
  });
});


function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
