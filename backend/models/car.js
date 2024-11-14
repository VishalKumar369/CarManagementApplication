const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: {
      type: [
        {
          car_type: { type: String },
          company: { type: String },
          dealer: { type: String }
        }
      ],
    },
    images: {
      type: [String],
      validate: [arrayLimit, "You can only upload up to 10 images."],
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 10;
}

module.exports = mongoose.model("Car", carSchema);
