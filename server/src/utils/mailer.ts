import nodemailer from "nodemailer";
import { google } from 'googleapis';

export const sendResetEmail = async (to: string, resetLink: string) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token || '',
      },
    } as any);

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: "Reset Password",
      html: `
        <h3>Reset Password</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Gmail API Error:", error);
    return { success: false };
  }
}




// export const sendResetEmail = async (to: string, resetLink: string) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",            // use built-in Gmail service
//     auth: {
//       user: process.env.MAIL_USER,   // your Gmail address
//       pass: process.env.MAIL_PASS,   // Gmail App Password, NOT normal password
//     },
//   });

//   try {
//     const info = await transporter.sendMail({
//       from: process.env.MAIL_USER,
//       to,
//       subject: "Reset your password",
//       html: `
//         <h3>Reset Password</h3>
//         <p>Click the link below to reset your password:</p>
//         <a href="${resetLink}">${resetLink}</a>
//       `,
//     });
//     console.log("Email sent:", info.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };