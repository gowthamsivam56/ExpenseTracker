import nodemailer from "nodemailer";

export const sendResetEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

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
