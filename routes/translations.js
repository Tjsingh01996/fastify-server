// routes/translations.js
const path = require("path");
const fs = require("fs").promises;

async function routes(fastify, options) {
  fastify.get("/translations/:lang/:ns", async (request, reply) => {
    const { lang, ns } = request.params;
    const filePath = path.join(__dirname, `../locales/${lang}/${ns}.json`);
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data); // full file as JSON
    } catch (err) {
      reply.code(404).send({ error: "Translation file not found" });
    }
  });
}

module.exports = routes;
