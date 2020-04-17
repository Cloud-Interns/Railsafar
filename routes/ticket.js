const express = require("express");
const router = express.Router();
const config = require("config");
const nodemailer = require("nodemailer");

const Ticket = require("../models/Ticket");
const User = require("../models/User");
const verifytoken = require("../middleware/verifytoken");

//@route POST api/ticket
//@desc Book a ticket
//@access Private

router.post("/bookticket", verifytoken, async (req, res) => {
  //destructuring the request body content
  const {
    sourceName,
    destinationName,
    doj,
    train,
    className,
    passenger,
  } = req.body;

  //Generating 10 digit random ticket ID
  ticketId = Math.floor(Math.random() * 9000000000) + 1000000000;

  try {
    let user = await User.findById(req.user).select("-password");
    let ticket = new Ticket({
      user: req.user,
      ticketId: ticketId,
      source: sourceName,
      destination: destinationName,
      dateOfJourney: doj,
      train,
      class: className,
      passengerDetails: passenger,
    });

    //Getting passengers array
    const passengers = [];
    for (let i = 0; i < ticket.passengerDetails.length; i++) {
      passengers.push(ticket.passengerDetails[i]);
    }
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
      subject: "Booked Ticket Details", // Subject line
      html: `<h1>Below are your booking details:</h1><br />
      <p>TICKET ID : ${ticket.ticketId}</p>
      <p>SOURCE : ${ticket.source}</p>
      <p>DESTINATION : ${ticket.destination}</p>
      <p>DATE OF JOURNEY : ${ticket.dateOfJourney}</p>
      <p>TRAIN : ${ticket.train}</p>
      <p>CLASS : ${ticket.class}</p>
      <p>PASSENGER DETAILS : ${passengers.map((passenger) => {
        return `
            <p>PNR Number : ${passenger.pnrId}</p>
            <p>NAME : ${passenger.name}</p>
            <p>AGE : ${passenger.age}</p>
            <p>GENDER : ${passenger.gender}</p>
            <p>FOOD : ${passenger.food}</p>
            <hr />`;
      })}</p><br />
      <p>Thank You for booking ticket witn us!</p><br />
      <p>Have a safe & happy journey :)</p><br />
      <p>Regards,</p><br />
      `,
    });

    //saving ticket to database
    await ticket.save();
    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
    });
  }
});

module.exports = router;