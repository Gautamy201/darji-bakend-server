const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    partyName: {
      type: String,
      required: true,
    },
    vechicleNumber: {
      type: String,
      required: true,
    },
    driverContactNumber: {
      type: String,
      required: true,
    },
    poNumber: {
      type: String,
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    cameraForTSL: {
      type: String,
      required: true,
    },
    plant: {
      type: String,
      required: true,
    },
    ecgName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);
