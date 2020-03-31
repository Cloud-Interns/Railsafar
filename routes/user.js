const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@route POST api/user
//@desc Register a user
//@access Public

router.post(
  "/register",
  [
    check("firstname", "Please enter valid firstname!")
      .not()
      .isEmpty(),
    check("lastname", "Please enter valid lastname!")
      .not()
      .isEmpty(),
    check("email", "Please enter valid email address!")
      .not()
      .isEmpty()
      .isEmail(),
    check(
      "password",
      "Please enter password with 8 or more characters!"
    ).isLength({ min: 8 }),
    check("dob", "Please enter valid date of birth!")
      .not()
      .isEmpty(),
    check("gender", "Please enter valid gender!")
      .not()
      .isEmpty(),
    check("phone", "Please enter valid phone number!").isLength({ min: 10 })
  ],
  async (req, res) => {
    //collecting all the errors occurred in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //if there are errors
      return res.status(400).json({ errors: errors.array() });
    }

    //else destructuring the request body content
    const {
      firstname,
      lastname,
      email,
      password,
      dob,
      gender,
      phone
    } = req.body;

    try {
      //searching user based on email
      let user = await User.findOne({ email });
      if (user) {
        return res.status(200).json({
          msg: "User already exists!!",
          type: "warning"
        });
      }

      //else creating a new instance of "User" model
      else {
        user = new User({
          firstname,
          lastname,
          email,
          password,
          dob,
          gender,
          phone
        });

        //generating SALT(like a secret code or key) using bcryptjs
        const salt = await bcrypt.genSalt(10);
        //hashing and encrypting password before it is being saved in database
        user.password = await bcrypt.hash(password, salt);

        //sending mail to user for verification
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: config.get("GmailID"),
            pass: config.get("GmailPwd")
          }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"RailSafar Team" <railsafar6599@gmail.com>', // sender address
          to: user.email,
          subject: "Thanks & Welcome to Railsafar!!", // Subject line
          html: `<h3>Hello ${user.firstname}&nbsp;${user.lastname},</h3><br />
                <h1 style="align : center;">We're from Railsafar Team</h1>
                <img src="https://images.unsplash.com/photo-1487662701465-ee09afb4e1fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=834&q=80" alt="image" /><br />
                <h4 style="align : center;">In your service always :)</h4><br /><br />
                <p>Thank you for registering !!</p>
                <p>Have a great day ahead :)</p>
                <p>Regards,</p>
                <p>Railsafar Team</p>
                `
        });

        //console.log("Message sent: %s", info.messageId);
        //saving user to database
        await user.save();
        return res.status(200).json({
          msg: "Success!! Verify Email to complete registration.",
          type: "success"
        });
      }
    } catch (err) {
      return res.status(500).json({
        msg: "An error occured during registration!!"
      });
    }
  }
);

//@route POST api/user/sendemail
//@desc Look for user & send email
//@access Public
router.post("/sendemail", async (req, res) => {
  const { email } = req.body;

  try {
    //searching user based on email
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({
        msg: "No such user exists!!"
      });
    } else {
      const payload = {
        id: user.id,
        email: email
      };

      //sending mail to user with OTP
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.get("GmailID"),
          pass: config.get("GmailPwd")
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"RailSafar Team" <railsafar6599@gmail.com>', // sender address
        to: email,
        subject: "OTP for Railsafar account password", // Subject line
        html: `<h3>Hello ${user.firstname}&nbsp;${user.lastname},</h3><br />
                <h1 style="align : center;">We're from Railsafar Team</h1>
                <br />
                <h2>You requested for the password reset</h2>
                <img src="https://images.unsplash.com/photo-1508345228704-935cc84bf5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="image" />
                <h1 style="align : center;">Click on the below link to reset password</h1>         
                <a href="http://localhost:4200/resetpassword/${payload.id}">Click here</a>
                <p>Please do not share with anyone!</p>
                <p>Have a great day ahead :)</p>
                <p>Regards,</p>
                <p>Railsafar Team</p>
                `
      });
      return res.json({ msg: "OTP sent to your email!" });
    }
  } catch (err) {
    return res.status(500).json({
      msg: "An error occured during registration!!"
    });
  }
});

//@route POST api/user/resetpassword/:id
//@desc Change user's password
//@access Public
router.post("/resetpassword/:id", async (req, res) => {
  const { id } = req.params.id;
  console.log(id);
  console.log(req.body.password);
  const { newPassword } = req.body.password;
  try {
    //get the user based on ID
    let user = await User.findOne({ id });
    if (!user) {
      return res.json({
        msg: "No such user exists!!"
      });
    } else {
      //generating SALT(like a secret code or key) using bcryptjs
      const salt = await bcrypt.genSalt(10);
      //hashing and encrypting  new password before it is being saved in database
      user.password = await bcrypt.hash(newPassword, salt);

      //updating DB
      await user.save();
      return res.status(200).json({ msg: "Password changed successfully!!" });
    }
  } catch (err) {
    return res.status(500).json({
      msg: "An error occured during registration!!"
    });
  }
});

module.exports = router;
