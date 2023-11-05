import express from "express";
import countryService from "./services/countryService";

const router = express.Router();

router.get('/', countryService.getCountryByIP);

export default router;
