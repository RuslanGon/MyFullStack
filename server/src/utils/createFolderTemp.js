import fs from 'node:fs/promises';

export const createFolderTemp = async (dirPath) => {
  try {
    await fs.access(dirPath);

  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dirPath, { recursive: true });

    } else {

      throw error;
    }
  }
};
