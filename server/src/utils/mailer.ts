import { google } from 'googleapis';

export const sendResetEmail = async (to: string, resetLink: string) => {
  const auth = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  auth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const gmail = google.gmail({ version: 'v1', auth });

  // The email content string
  const emailContent = [
    `From: ${process.env.MAIL_USER}`, // The sender's email
    `To: ${to}`,
    `Subject: Reset Password`,
    `Content-Type: text/html; charset=utf-8`,
    '',
    `<h3>Reset Password</h3>`,
    `<p>Click the link below to reset your password:</p>`,
    `<a href="${resetLink}">${resetLink}</a>`
  ].join('\n');

  try {
    await gmail.users.messages.send({
      userId: 'me', // 'me' tells Google to use the authenticated user
      requestBody: {
        raw: Buffer.from(emailContent).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Mail Error:", error);
    return { success: false };
  }
};