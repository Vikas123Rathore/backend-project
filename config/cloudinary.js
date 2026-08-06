import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const isCloudinaryConfigured = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

const uploadOnCloudinary = async (filepath) => {
    if (!isCloudinaryConfigured) {
        console.warn("Cloudinary is not configured. Skipping image upload.");
        return null;
    }

    try {
        const result = await cloudinary.uploader.upload(filepath, {
            folder: "posthub",
            resource_type: "image",
        });

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        return result.secure_url;
    } catch (error) {
        console.warn("Cloudinary upload failed, continuing without image:", error?.message || error);

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        return null;
    }
};

export default uploadOnCloudinary;
