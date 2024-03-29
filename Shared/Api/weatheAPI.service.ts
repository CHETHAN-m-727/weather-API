import axios, { AxiosResponse } from "axios";
import { API_KEY, BASE_URL } from "../constant";

export const getWeatherAPICall = (cityName: string): Promise<any> => {
  const url = `${BASE_URL}/weather?q=${cityName}&APPID=${API_KEY}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response: AxiosResponse) => {
        resolve(response);
      })
      .catch((error: any) => {
        console.error(error);
        reject(error.response.data);
      });
  });
};

export const getWeatherByLatANDLonAPICall = (
  Latitude: string,
  Longitude: string
): Promise<any> => {
  const url = `${BASE_URL}/weather?lat=${Latitude}&lon=${Longitude}&APPID=${API_KEY}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response: AxiosResponse) => {
        resolve(response);
      })
      .catch((error: any) => {
        console.error(error);
        reject(error.response.data);
      });
  });
};

export const getForecastAPICall = (cityName: string): Promise<any> => {
  const url = `${BASE_URL}/forecast?q=${cityName}&APPID=${API_KEY}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response: AxiosResponse) => {
        resolve(response);
      })
      .catch((error: any) => {
        console.error(error);
        reject(error.response.data);
      });
  });
};
