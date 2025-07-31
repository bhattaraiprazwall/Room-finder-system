const nodemailer = require('nodemailer');
require('dotenv').config(); 

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true', 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const sendEmail = async (to, subject, html) => {
  try {
    if (!to) {
      throw new Error("No recipients defined");
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject: subject,
      html: html 
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};



module.exports = sendEmail;
