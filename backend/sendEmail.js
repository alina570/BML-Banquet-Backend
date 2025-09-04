const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASS, 
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER, 
      to: to, 
      subject: subject, 
      text: text, 
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
