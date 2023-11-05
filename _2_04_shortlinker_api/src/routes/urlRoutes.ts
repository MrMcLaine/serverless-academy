import express from 'express';
import { errorHandler } from "../handlers/errorHandler";
import { createShortUrl, getUrlByShortUrl } from '../services/urlService';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const { shortUrl } = await createShortUrl(originalUrl);
        res.json({ originalUrl, shortUrl });
    } catch (error) {
        errorHandler(res, error);
    }
});

router.get('/:shortUrl', async (req, res) => {
    try {
        const url = await getUrlByShortUrl(req.params.shortUrl);

        if (url) {
            return res.redirect(url.originalUrl);
        }

        res.status(404).json({ message: 'URL not found' });
    } catch (error) {
        errorHandler(res, error);
    }
});

export default router;
