const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const rejectedPlacesSchema = new Schema({
  rejectedMessage: {
      type: String,
      required: true,
  },

  rejectedPlace: {
    _id:{
        type:String,
        required:true,
        unique:true,
    },
    owner: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    perks: {
      type: [String],
      required: true,
    },
    extraInfo: {
      type: String,
      required: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
});

const AirnbRejectedPlacesSchema = mongoose.model(
  "airnbrejectedplaces",
  rejectedPlacesSchema
);

module.exports = AirnbRejectedPlacesSchema;
