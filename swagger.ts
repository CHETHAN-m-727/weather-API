const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.ts"];

const options = {
  language: "en-US",
  disableLogs: false,
  autoHeaders: true,
  autoQuery: true,
  autoBody: true,
};

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "https://weather-api-t3nv.onrender.com", // Update with the appropriate hostname and port
  schemes: ["https"], // Add both HTTP and HTTPS schemes
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Bearer token authorization",
    },
  },
  security: [{ BearerAuth: [] }], // Add security configuration to apply BearerAuth globally
  // Add cookies support
  consumes: ["application/json"],
  produces: ["application/json"],
};

swaggerAutogen(outputFile, endpointsFiles, doc, options);
