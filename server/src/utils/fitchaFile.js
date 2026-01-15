import { ENV_VARS } from '../constants/index.js';
import { env } from './env.js';
import { saveFile } from './saveFile.js';
import { saveToCloudinary } from './saveToCloudinary.js';

export const fitchaFile = async (file) => {
  const isCloudinaryEnabled =
    env(ENV_VARS.IS_CLOUDINARY_ENABLED) === 'true';

  if (isCloudinaryEnabled) {
    return await saveToCloudinary(file);
  }

  return await saveFile(file);
};
