/**
 * Model for the result collection.
 * Contains the schema for the users collection.
 */

const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Event",
    },
    firstName: {
      type: String,
      required: [true, "Please enter first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter last name"],
    },
    gender: {
      type: String,
      required: [true, "Please enter gender"],
    },
    member: {
      type: String,
      required: [true, "Please enter membership status"],
    },
    // institution:{
    //   type: String,
    //   required: [true, 'Please enter institution'],
    // },
    // ageCategory: {
    //   type: String,
    //   required: [true, 'Please enter age category']
    // },
    runTiming: {
      type: String,
      required: [true, "Please enter run timing"],
    },
    runDistance: {
      type: Number,
      required: [true, "Please enter run distancd"],
    },
    loops: {
      type: Number,
      required: [true, "Please enter number of 10.5km loops"],
    },
    runDate: {
      type: Date,
      required: [true, "Please add run date"],
    },
    // screenshot:{
    //   type: String,
    //   required: [true, 'Please upload a screenshot']
    // },
    calculatedAPI: {
      type: String,
      required: [true, "No API was calculated"],
    },
    apiVerified: {
      type: Boolean,
    },
    loopsVerified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Result", resultSchema);
