const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const verifytoken = require("../middleware/verifytoken");

//@route POST api/user
//@desc Register a user
//@access Public

router.post("/register", async (req, res) => {
  //destructuring the request body content
  const { firstname, lastname, email, password, dob, gender, phone } = req.body;

  try {
    //searching user based on email
    let user = await User.findOne({ email });
    if (user) {
      return res.json({
        status: "warning",
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
        phone,
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
          pass: config.get("GmailPwd"),
        },
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
                `,
      });

      //saving user to database
      await user.save();
      return res.status(200).json({
        status: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
    });
  }
});

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
        status: "warning",
      });
    } else {
      const payload = {
        id: user.id,
      };

      const tokenID = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: "24h",
      });

      //sending mail to user
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.get("GmailID"),
          pass: config.get("GmailPwd"),
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"RailSafar Team" <railsafar6599@gmail.com>', // sender address
        to: email,
        subject: "Railsafar account password reset ", // Subject line
        html: `<h3>Hello ${user.firstname}&nbsp;${user.lastname},</h3><br />
                <h1 style="align : center;">We're from Railsafar Team</h1>
                <h2>You requested for the password reset</h2>
                <img src="https://png.pngtree.com/png-clipart/20190614/original/pngtree-padlock-vector-icon-png-image_3725460.jpg" class="img-responsive" style="width:100px;height:100px" alt="image" />
                <h1 style="align : center;">Click on the below link to reset password</h1>         
                <a href="http://railsafar.herokuapp.com/resetpassword/${tokenID}">Click here</a><br />
                <strong>Note : </strong><b>This link is valid only for 24 hours!!</b>
                <p>Please do not share with anyone!</p>
                <p>Have a great day ahead :)</p>
                <p>Regards,</p>
                <p>Railsafar Team</p>
                `,
      });
      return res.status(200).json({ status: "success" });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
    });
  }
});

//@route POST api/user/resetpassword/:id
//@desc Change user's password
//@access Public
router.post("/resetpassword/:token", async (req, res) => {
  try {
    //decode token & extract id
    const decoded = jwt.verify(req.params.token, config.get("jwtSecret"));
    const id = decoded.id;

    //get the user based on ID
    let user = await User.findById(id);

    if (!user) {
      return res.json({
        status: "warning",
      });
    } else {
      //generating SALT(like a secret code or key) using bcryptjs
      const salt = await bcrypt.genSalt(10);
      //hashing and encrypting  new password before it is being saved in database
      user.password = await bcrypt.hash(req.body.newPassword, salt);

      //updating DB
      await user.save();
      return res.status(200).json({ status: "success" });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
    });
  }
});

//@route POST api/user/updateProfile
//@desc Update User's Profile
//@access Private
router.post("/updateProfile", verifytoken, async (req, res) => {
  const id = req.user;
  const { newEmail, newPhone } = req.body;
  try {
    const user = await User.findById(id);
    if (user) {
      if (newEmail !== null && newPhone !== null) {
        await User.updateOne(
          { _id: id },
          { $set: { email: newEmail, phone: newPhone } }
        );
        return res.status(200).json({ status: "success" });
      } else if (newEmail !== null) {
        await User.updateOne({ _id: id }, { $set: { email: newEmail } });
        return res.status(200).json({ status: "success" });
      } else if (newPhone !== null) {
        await User.updateOne({ _id: id }, { $set: { phone: newPhone } });
        return res.status(200).json({ status: "success" });
      } else {
        return res.json({ status: "error" });
      }
    } else {
      return res.json({ status: "error" });
    }
  } catch (err) {
    return res.status(500).json({ status: "error" });
  }
});

module.exports = router;
