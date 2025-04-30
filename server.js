
require("dotenv").config();
const fastify = require("fastify")({
  logger: true,
  origin: "*",
});
const cors = require("@fastify/cors");
const sequelize = require("./config/db");
fastify.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // credentials: true, // uncomment if you need cookies/headers
});
// fastify.register(require("@fastify/cors"), { origin: "http://localhost:3000" });

 
fastify.register(require("./routes/products"));

fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  reply.status(statusCode).send({ error: message });
});

// Start the server
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
    await fastify.listen({ port: 8000 });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
