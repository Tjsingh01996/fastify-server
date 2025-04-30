const fastify = require("fastify")();
const productRoutes = require("./routes/products");

fastify.register(productRoutes);

module.exports = fastify;
