const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "zcm7qd25g2jgssuh@ethereal.email",
    pass: "79qTQ5VyWbns6guT3g",
  },
});

module.exports = async (mail, link) => {
  console.log(mail, link);
  let info = await transporter.sendMail({
    from: "Admin", // sender address
    to: mail, // list of receivers
    subject: "Login Successfull", // Subject line
    html: `Click the link here <a>${link}</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
