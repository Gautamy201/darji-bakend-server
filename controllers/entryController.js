const Entry = require("../models/Entry");

// create new entry
exports.creteEntry = async (req, res) => {
  try {
    const {
      date,
      partyName,
      vechicleNumber,
      driverContactNumber,
      poNumber,
      invoiceNumber,
      driverName,
      cameraForTSL,
      plant,
      ecgName,
    } = req.body;

    const newEntry = new Entry({
      date,
      partyName,
      vechicleNumber,
      driverContactNumber,
      poNumber,
      invoiceNumber,
      driverName,
      cameraForTSL,
      plant,
      ecgName,
    });
    await newEntry.save();
    res.status(200).json({
      success: true,
      message: "Entry added",
      entry: newEntry,
    });
  } catch (err) {
    console.log(err);
  }
};

// get all entrys

exports.getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find();
    res.status(200).json({
      success: true,
      entries: entries,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch entries",
      error,
    });
  }
};

// get recent entrys

exports.getRecentEntries = async (req, res) => {
  try {
    const recentEntries = await Entry.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json({
      success: true,
      entries: recentEntries,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch entries",
      error,
    });
  }
};
