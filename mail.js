var nodemailer = require("nodemailer");
require("dotenv").config();

function SendMail(name, email) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.G_EMAIL}`,
      pass: `${process.env.G_PASSWORD}`,
    },
  });

  var mailOptions = {
    from: `${process.env.G_EMAIL}`,
    to: `${email}`,
    subject: "Sending Email For Verification",
    text: `hello ${name} .Thank you for registering Please verify your email , your code is 121`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = SendMail;
