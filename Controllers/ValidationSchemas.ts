import Joi from "joi";

// Define schema for request body
export const Request_validation = Joi.object({
  cityName: Joi.string().required(),
});
