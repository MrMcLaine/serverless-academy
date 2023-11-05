import UrlCustom, { IUrlCustom } from "../models/UrlCustom";
import { convertToBase62 } from '../utils/convertToBase62';

export const createShortUrl = async (originalUrl: string): Promise<IUrlCustom> => {
    const newUrl = new UrlCustom({
        originalUrl
    });

    await newUrl.save();

    newUrl.shortUrl = convertToBase62(newUrl._id.toHexString());
    await newUrl.save();

    return newUrl;
};

export const getUrlByShortUrl = async (shortUrl: string): Promise<IUrlCustom | null> => {

    return UrlCustom.findOne({shortUrl});
};
