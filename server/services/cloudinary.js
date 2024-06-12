import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploads = (file, folder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.uploader.upload(file, {
        folder: folder,
        resource_type: "auto",
      });
      resolve(
        {
          id: result.public_id,
          url: result.secure_url,
        },
        {
          resource_type: "auto",
          folder: folder,
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};
