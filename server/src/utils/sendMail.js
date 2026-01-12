import nodemailer from 'nodemailer';
import { env } from './env.js';
import { ENV_VARS } from '../constants/index.js';

const transporter = nodemailer.createTransport({
  host:env(ENV_VARS.SMTP_HOST) ,
  port: env(ENV_VARS.SMTP_PORT),
  auth: {
    user: env(ENV_VARS.SMTP_USER),
    pass: env(ENV_VARS.SMTP_PASSWORD),
  },
  from: env(ENV_VARS.SMTP_USER)
});

export const sendMail = async (option) => {
  return await transporter.sendMail(option);
};
