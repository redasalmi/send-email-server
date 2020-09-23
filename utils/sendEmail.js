const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, body) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  await transporter.sendMail({
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    subject: `${subject}, sent from ${email}`,
    text: body,
    html: `<p>${body}</p>`,
  });
};

module.exports = sendEmail;
