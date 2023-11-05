import mongoose, { Schema } from 'mongoose';

export interface IUrlCustom {
    originalUrl: string;
    shortUrl?: string;
}

const UrlCustomSchema: Schema = new Schema<IUrlCustom>({
    originalUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        unique: true,
    },
}, {
    timestamps: true
});

const UrlCustom =
    mongoose.models.UrlCustom ||
    mongoose.model<IUrlCustom, mongoose.Model<IUrlCustom>>('UrlCustom', UrlCustomSchema);
export default UrlCustom;
