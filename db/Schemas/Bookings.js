const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const AirNBPlaces = require("../Schemas/AirNBPlaces");

const bookingsSchema = new Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "airnbplaces",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

const BookingsSchema = mongoose.model("airnbbookings", bookingsSchema);

module.exports = BookingsSchema;