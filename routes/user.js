const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
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
        return res.status(400).json({ msg: "User already exists!!" });
      }

      //else creating a new instance of "User" model
      user = new User({
        firstname,
        lastname,
        email,
        password,
        dob,
        age: 0,
        gender,
        phone
      });

      //generating SALT(like a secret code or key) using bcryptjs
      const salt = await bcrypt.genSalt(10);
      //hashing and encrypting password before it is being saved in database
      user.password = await bcrypt.hash(password, salt);

      //calculating age
      const birthYear = new Date(dob).getYear();
      const currentYear = new Date().getYear();
      user.age = currentYear - birthYear;

      //saving user to database
      await user.save();

      //creating a payload which is just a piece of info about user here its ID(virtual) generated by mongoose
      const payload = {
        user: user.id
      };

      const secret = config.get("jwtSecret");

      //signing JWT with payload, secret(anything in String), options(like token expire time in seconds etc...) and callback
      jwt.sign(
        payload,
        secret,
        {
          expiresIn: 3600000
        },
        (err, token) => {
          if (err) throw err;
          else {
            res.json({ token });
          }
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error!!");      
    }
  }
);
module.exports = router;