import mongoose, { Schema } from 'mongoose';

export interface IJsonEntry {
    path: string;
    data: any;
}

const jsonEntrySchema: Schema = new Schema<IJsonEntry>({
    path: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

const JsonEntry =
    mongoose.models.JsonEntry ||
    mongoose.model<IJsonEntry, mongoose.Model<IJsonEntry>>('JsonEntry', jsonEntrySchema);
export default JsonEntry;
