import { Router } from "express";
import { getForecast, getWeather } from "../Controllers/weather";
import { validateQuery } from "../Middlewares/commenFunctions";
import { Request_validation } from "../Controllers/ValidationSchemas";

const router = Router();

router.route("/Weather").get([validateQuery(Request_validation)], getWeather);
router.route("/Forecast").get([validateQuery(Request_validation)], getForecast);

export default router;
