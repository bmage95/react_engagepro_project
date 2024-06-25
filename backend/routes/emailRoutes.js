const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");

dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

router.post("/sendEmail", expressAsyncHandler(async (req, res) => {
  const { email, subject, message } = req.body;

  var mailOptions = {
    from: email,  // Use the email provided in the form
    to: process.env.SMTP_MAIL, // your email address
    subject: subject,
    text: message,
    cc: email,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send(error.toString());
    } else {
      console.log("Email sent successfully!");
      res.status(200).send("Email sent successfully!");
    }
  });
}));

module.exports = router;
