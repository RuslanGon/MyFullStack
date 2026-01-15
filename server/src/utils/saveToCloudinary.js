import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';
import { ENV_VARS } from '../constants/index.js';
import fs from 'node:fs/promises';


cloudinary.config({
  cloud_name: env(ENV_VARS.CLOUDINARY_CLOUD_NAME),
  api_key: env(ENV_VARS.CLOUDINARY_API_KEY),
  api_secret: env(ENV_VARS.CLOUDINARY_API_SECRET),
});

export const saveToCloudinary = async (file) => {
  const result = await cloudinary.uploader.upload(file.path, {
    folder: 'students',
    resource_type: 'image',
  });
    // ✅ удаляем временный файл
    await fs.unlink(file.path);

  return result.secure_url;
};
