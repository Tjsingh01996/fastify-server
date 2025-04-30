// routes/products.js
const Product = require("../models/Product");

async function routes(fastify, options) {
  // Get all products with pagination
  fastify.get("/products", async (request, reply) => {
    try {
      const { page = 1, limit = 10, order = "DESC" } = request.query; // 👈 default page=1, limit=10
      const offset = (page - 1) * limit;

      const { count, rows } = await Product.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["created_at", order]],
      });
      return {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        rows,
      };
    } catch (err) {
      console.error(err);
      fastify.log.error(err);
      reply.code(500).send({ error: "Failed to fetch products" });
    }
  });


  
  // Create a new product
  fastify.post("/products", async (request, reply) => {
    try {
      const {
        article_no,
        product_service,
        in_price,
        price,
        unit,
        in_stock,
        description,
      } = request.body;

      // Validation (basic)
      if (!article_no || !product_service) {
        return reply
          .code(400)
          .send({ error: "Article No and Product/Service are required" });
      }
      const newProduct = await Product.create({
        article_no,
        product_service,
        in_price,
        price,
        unit,
        in_stock,
        description,
      });
      
      return newProduct;
    } catch (err) {
      console.log(err);
      fastify.log.error(err);
      reply.code(500).send({ error: "Failed to create product" });
    }
  });

  // Update a product
  fastify.put("/products/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      const updateData = request.body;

      const product = await Product.findByPk(id);
      if (!product) {
        return reply.code(404).send({ error: "Product not found" });
      }

      await product.update(updateData);
      return product;
    } catch (err) {
      console.log(err);
      fastify.log.error(err);
      reply.code(500).send({ error: "Failed to update product" });
    }
  });

  // Delete a product
  fastify.delete("/products/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      const product = await Product.findByPk(id);
      
      if (!product) {
        return reply.code(404).send({ error: "Product not found" });
      }

      await product.destroy();
      return { message: "Product deleted successfully" };
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: "Failed to delete product" });
    }
  });
}

module.exports = routes;
