import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3005;
export const ENVIRONMENT = process.env.ENVIRONMENT || "local";
export const API_KEY = process.env.API_KEY;
export const BASE_URL = process.env.BASE_URL;
