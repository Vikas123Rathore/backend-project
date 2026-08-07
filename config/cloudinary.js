import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Check if Cloudinary credentials are available
const isCloudinaryConfigured = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

// Configure Cloudinary
if (isCloudinaryConfigured) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

// Upload image to Cloudinary
const uploadOnCloudinary = async (filepath) => {

    // Skip upload if Cloudinary is not configured
    if (!isCloudinaryConfigured) {
        console.warn("Cloudinary is not configured. Skipping image upload.");
        return null;
    }

    try {

        // Upload image
        const result = await cloudinary.uploader.upload(filepath, {
            folder: "posthub",
            resource_type: "image",
        });

        // Delete local file after successful upload
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        // Return uploaded image URL
        return result.secure_url;

    } catch (error) {

        console.warn(
            "Cloudinary upload failed, continuing without image:",
            error?.message || error
        );

        // Delete local file even if upload fails
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        return null;
    }
};

export default uploadOnCloudinary;
