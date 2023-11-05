import express from 'express';
import { saveJsonEntry, getJsonEntry } from '../services/jsonService';
import { errorHandler } from "../handlers/errorHandler";

const router = express.Router();

router.put('/:jsonPath', async (req, res) => {
    try {
        console.log('start put');
        const { jsonPath } = req.params;
        const data = req.body;
        const entry = await saveJsonEntry(jsonPath, data);
        res.status(200).json(entry);
    } catch (error) {
        errorHandler(res, error);
    }
});

router.get('/:jsonPath', async (req, res) => {
    try {
        const { jsonPath } = req.params;
        const entry = await getJsonEntry(jsonPath);
        if (!entry) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(entry.data);
    } catch (error) {
        errorHandler(res, error);
    }
});

export default router;
