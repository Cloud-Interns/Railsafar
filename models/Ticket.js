const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const TicketSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  ticketId: {
    type: Number,
    required: true,
    unique: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  dateOfJourney: {
    type: Date,
    required: true,
  },
  train: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  passengerDetails: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("Ticket", TicketSchema);
