import { Request, Response } from "express";
import {
  getForecastAPICall,
  getWeatherAPICall,
} from "../Shared/Api/weatheAPI.service";
import { error } from "console";
import path from "path";

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
        function timeConverter(UNIX_timestamp: number) {
          const a = new Date(UNIX_timestamp * 1000);

          const hour = a.getHours();
          const min = a.getMinutes();
          const sec = a.getSeconds();
          const time = hour + ":" + min + ":" + sec;
          return time;
        }
        const jsonData = {
          name: response?.data?.name || "",
          main: {
            temp: (response?.data?.main.temp - 273.15).toFixed(2) || "",
            temp_min: (response?.data?.main.temp_min - 273.15).toFixed(2) || "",
            temp_max: (response?.data?.main.temp_max - 273.15).toFixed(2) || "",
            pressure: response?.data?.main.pressure || "",
            humidity: response?.data?.main.humidity || "",
            sea_level: response?.data?.main.sea_level || "",
            grnd_level: response?.data?.main.grnd_level || "",
          },
          visibility: response?.data?.visibility / 1000 || "",
          wind: {
            speed: (response?.data?.wind.speed * 3.6).toFixed(2) || "",
            deg: response?.data?.wind.deg * 3.6 || "",
            gust: response?.data?.wind.gust * 3.6 || "",
          },
          clouds: {
            all: response?.data?.clouds.all || "",
          },
          coord: {
            lon: response?.data?.coord.lon || "",
            lat: response?.data?.coord.lat || "",
          },
          weather: {
            id: response?.data?.weather[0]?.id || "",
            main: response?.data?.weather[0]?.main || "",
            description: response?.data?.weather[0]?.description || "",
            icon: response?.data?.weather[0]?.icon || "",
          },
          base: response?.data.base,
          sys: {
            country: response?.data.sys.country,
            sunrise: timeConverter(response?.data.sys.sunrise),
            sunset: timeConverter(response?.data.sys.sunset),
          },
        };
        res.status(200).json({
          status: "success",
          data: jsonData,
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

export const readMdFile = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "test.md"); // Path to your .md file
    res.download(filePath); // This sends the file to the client
  } catch (error) {
    console.error("Error in fetching file:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};
