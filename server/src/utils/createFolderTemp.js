import fs from 'node:fs/promises';

export const createFolderTemp = async (dirPath) => {
  try {
    await fs.access(dirPath);
    console.log(`Folder exists: ${dirPath}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dirPath, { recursive: true });
      console.log(`Folder created: ${dirPath}`);
    } else {
      console.error('Error checking folder:', error);
      throw error;
    }
  }
};
