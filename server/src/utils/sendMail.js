import nodemailer from 'nodemailer';
import { ENV_VARS } from '../constants/index.js';

const transporter = nodemailer.createTransport({
  host: ENV_VARS.SMTP_HOST,
  port: Number(ENV_VARS.SMTP_PORT),
  secure: false,      // false для STARTTLS
  requireTLS: true,   // форсировать TLS
  auth: {
    user: ENV_VARS.SMTP_USER,
    pass: ENV_VARS.SMTP_PASSWORD,
  },
  logger: true,
  debug: true
});

export const sendMail = async (options) => {
  return await transporter.sendMail({
    ...options,
    from: ENV_VARS.SMTP_USER, // от кого письмо
  });
};
