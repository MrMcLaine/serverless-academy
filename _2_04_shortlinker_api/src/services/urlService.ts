import UrlCustom, { IUrlCustom } from "../models/UrlCustom";
import { convertToBase62 } from '../utils/convertToBase62';
import { getDateCode } from "../utils/getDateCode";

export const createShortUrl = async (originalUrl: string): Promise<IUrlCustom> => {
    const dateCode = getDateCode();
    const convertedUrl = convertToBase62(originalUrl);

    const shortUrl = `${dateCode}${convertedUrl}`;

    const newUrl = new UrlCustom({
        originalUrl,
        shortUrl
    });

    await newUrl.save();

    return newUrl;
};


export const getUrlByShortUrl = async (shortUrl: string): Promise<IUrlCustom | null> => {

    return UrlCustom.findOne({shortUrl});
};
