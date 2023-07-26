const nodemailer = require("nodemailer");
const nodemailerEmail = process.env.NODEMAILER_EMAIL;
const nodemailerPass = process.env.NODEMAILER_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: nodemailerEmail,
    pass: nodemailerPass,
  },
});

const sendEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      console.log("Cannnot notify the user");
      // return res.status(500).json({ message: "Cannot notify the User" });
    } else {
      const mailOptions = {
        from: '"User Management" <thepurpleaxe432@gmail.com',
        to: email,
        subject: `Registration Successfull`,
        text: `Your account has been successfully created. You can now login with the below credentials.\nEmail : ${email},\nPassword : ${password}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log("Cannnot send email to the user", err);
          // res.status(500).json({ message: "Email not sent successfully" });
        } else {
          console.log("Email sent successfully to  the user");
          // res.status(200).json({ success: "Email sent successfully" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
