import { Request, Response } from "express";
import {
  getForecastAPICall,
  getWeatherAPICall,
} from "../Shared/Api/weatheAPI.service";
import { error } from "console";

export const getWeather = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cityName = req.query.cityName as string;

    if (!cityName) {
      res.status(400).json({
        status: "failed",
        data: "City name is required in the query parameters.",
      });
      return;
    }

    const response = await getWeatherAPICall(cityName)
      .then((response) => {
        res.status(200).json({
          status: "success",
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: "failed",
          data: error.message,
        });
      });
  } catch (error) {
    console.error("Error in fetching scheme:", error);
    res.status(500).json({ status: "failed", data: "Internal Server Error" });
  }
};
export const getForecast = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cityName = req.query.cityName as string;

    if (!cityName) {
      res.status(400).json({
        status: "failed",
        data: "City name is required in the query parameters.",
      });
      return;
    }

    const response = await getForecastAPICall(cityName)
      .then((response) => {
        res.status(200).json({
          status: "success",
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: "failed",
          data: error.message,
        });
      });
  } catch (error) {
    console.error("Error in fetching scheme:", error);
    res.status(500).json({ status: "failed", data: "Internal Server Error" });
  }
};
