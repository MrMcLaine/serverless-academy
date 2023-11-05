import { Request, Response } from 'express';
import { findCountryByIP } from "../utils/dataService";
import {errorHandler} from "../handlers/errorHandler";

const countryService = {
    getCountryByIP: async (req: Request, res: Response) => {
        let userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress as string;

        if (typeof userIP === "string") {
            userIP = userIP.split(',')[0].split('::ffff:')[0];
        }

        if (!userIP) {
            return res.status(400).send('IP address is missing');
        }

        userIP = userIP.toString();


        try {
            const country = await findCountryByIP(userIP);
            res.json({
                ip: userIP,
                country: country
            });
        } catch (error) {
            errorHandler(res, error);
        }
    }
}

export default countryService;