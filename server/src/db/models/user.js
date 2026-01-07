import { Schema, model } from 'mongoose';

const usersSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export const User = model('users', usersSchema);
