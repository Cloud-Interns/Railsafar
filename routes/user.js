const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
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
        //saving user to database
        await user.save();
        return res.status(200).json({
          msg: "Success!! Verify Email to complete registration.",
          type: "success"
        });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        msg: "An error occured during registration!!"
      });
    }
  }
);
module.exports = router;
