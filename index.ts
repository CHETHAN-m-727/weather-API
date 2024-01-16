// import './DB/db';
const express = require("express");
import { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json";
import { PORT, ENVIRONMENT } from "./Shared/Constant";
import getWeather from "./Routes/Weather.routes";
const app: Application = express();

const port = PORT || 3005; // Change this to the desired port number
const environment = ENVIRONMENT;
const swaggerfile =
  environment === "local"
    ? { ...swaggerFile, host: `localhost:${port}`, schemes: ["http"] }
    : swaggerFile;

app.use(bodyParser.json());
// app.use(bodyParser.text());

// CORS configurations
app.use(
  cors({
    // origin: "https://investments-ui.thefirstock.tech", // Replace with the appropriate frontend URL
    origin: "*", // Replace with the appropriate frontend URL
    methods: "*", // ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: "*", //['Content-Type', 'Authorization'],
  })
);

// Routes
app.use("/", getWeather);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerfile));

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
