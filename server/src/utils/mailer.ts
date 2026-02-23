import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendResetEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  } as SMTPTransport.Options);

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: "Reset your password",
    html: `
      <h3>Reset Password</h3>
      <p>Click below link to reset your password</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });
};
