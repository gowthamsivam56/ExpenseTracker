import nodemailer from "nodemailer";

export const sendResetEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",            // use built-in Gmail service
    auth: {
      user: process.env.MAIL_USER,   // your Gmail address
      pass: process.env.MAIL_PASS,   // Gmail App Password, NOT normal password
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: "Reset your password",
      html: `
        <h3>Reset Password</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};