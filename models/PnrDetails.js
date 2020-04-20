const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pnrDetailsSchema = new Schema({
  pnrNo: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  food: {
    type: String,
    required: true,
  },
  seatNo: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Confirmed",
    required: true,
  },
});

module.exports = mongoose.model("PnrDetails", pnrDetailsSchema);
