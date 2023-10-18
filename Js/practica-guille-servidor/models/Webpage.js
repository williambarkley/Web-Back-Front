const mongoose = require("mongoose");

const WebpageSchema = new mongoose.Schema(
  {
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "merchant",
    },
    city: {
      type: String,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    texts: {
      type: [String],
    },
    scoring: {
      type: mongoose.Types.Decimal128,
      default: 0,
    },
    reviews: [
      {
        review: { type: String },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    scores: [
      {
        score: { type: Number },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },

  {
    timestamp: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("webpage", WebpageSchema);
