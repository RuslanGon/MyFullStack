import mongoose from 'mongoose';

export const validateMongoId = (req, res, next) => {
  const { studentId } = req.params;

  if (!mongoose.isValidObjectId(studentId)) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid student id',
    });
  }

  next();
};
