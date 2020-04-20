const express = require("express");
const router = express.Router();
const config = require("config");
const nodemailer = require("nodemailer");

const Ticket = require("../models/Ticket");
const User = require("../models/User");
const PnrDetails = require("../models/PnrDetails");
const verifytoken = require("../middleware/verifytoken");

//<--------------------TICKET BOOKING ---------------------------------------------------------->

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

  //Checking if passengers list is empty
  if (passenger.length === 0) {
    return res.json({ status: "fatal" });
  }
  //Generating 10 digit random ticket ID
  ticketId = Math.floor(Math.random() * 9000000000) + 1000000000;

  //Fare
  fare = 1050 * passenger.length;

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
      fare: fare,
      passengerDetails: passenger,
    });

    //Getting passengers array
    const passengers = [];
    for (let i = 0; i < ticket.passengerDetails.length; i++) {
      passengers.push(ticket.passengerDetails[i]);
    }

    //creating 10 digit PNR No & 3 digit Seat No for each passenger and saving it in Pnr collection
    passengers.map(async (passenger) => {
      passenger.pnrNo = Math.floor(Math.random() * 9000000000) + 1000000000;
      passenger.seatNo = Math.floor(Math.random() * 900) + 100;
      let pnrDetails = new PnrDetails(passenger);
      await pnrDetails.save();
    });

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
      subject: "Ticket Details", // Subject line
      html: `<h1>Below are your booking details:</h1><br />
      <p>TICKET ID : ${ticket.ticketId}</p>
      <p>SOURCE : ${ticket.source}</p>
      <p>DESTINATION : ${ticket.destination}</p>
      <p>DATE OF JOURNEY : ${ticket.dateOfJourney}</p>
      <p>TRAIN : ${ticket.train}</p>
      <p>TRAIN : ${ticket.fare}</p>
      <p>CLASS : ${ticket.class}</p>
      <p>PASSENGER DETAILS : ${passengers.map((passenger) => {
        return `
            <p>NAME : ${passenger.name}</p>
            <p>PNR Number : ${passenger.pnrNo}</p>
            <p>Seat Number : ${passenger.seatNo}</p>
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

//<--------------------TICKET BOOKING COMPLETED----------------------------------------------------->

//<--------------------GET USER'S TICKETS------------------------------------------------------------->

//@route GET api/ticket
//@desc Get all tickets of logged in user
//@access Private
router.get("/gettickets", verifytoken, async (req, res) => {
  try {
    let user = await User.findById(req.user);
    const { _id } = user;
    let tickets = await Ticket.find({ user: _id });
    return res.status(200).json({ tickets: tickets });
  } catch (err) {
    return res.status(500).json({
      status: "error",
    });
  }
});
//<--------------------GET USER'S TICKET COMPLETED----------------------------------------------------->

//<--------------------CANCEL TICKET----------------------------------------------------------------->

//@route DELETE api/ticket
//@desc Cancel ticket
//@access Public
router.delete("/cancelticket/:ticketId", async (req, res) => {
  try {
    let ticket = await Ticket.findOne({ ticketId: req.params.ticketId });
    if (ticket) {
      await Ticket.deleteOne({ ticketId: req.params.ticketId });
      return res.status(200).json({ status: "success" });
    } else {
      return res.json({ status: "error" });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
    });
  }
});

//<--------------------CANCEL TICKET COMPLETED----------------------------------------------------->

//<--------------------GET PNR DETAILS------------------------------------------------------------>

//@route GET api/ticket
//@desc Get PNR Details of logged in user
//@access Public
router.get("/getPnrDetails/:pnrNo", async (req, res) => {
  try {
    let pnrDetails = await PnrDetails.findOne({ pnrNo: req.params.pnrNo });
    if (pnrDetails) {
      return res
        .status(200)
        .json({ pnrDetails: pnrDetails, status: "success" });
    } else {
      return res.json({ status: "error" });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
    });
  }
});
//<--------------------GET PNR DETAILS COMPLETED----------------------------------------------------->

module.exports = router;
