import JsonEntry, { IJsonEntry } from '../models/JSONEntry';

const saveJsonEntry = async (path: string, data: any): Promise<IJsonEntry | null> => {
    return JsonEntry.findOneAndUpdate(
        { path },
        { data },
        {new: true, upsert: true}
    );
};

const getJsonEntry = async (path: string): Promise<IJsonEntry | null> => {
    return JsonEntry.findOne({ path });
};

export { saveJsonEntry, getJsonEntry };
