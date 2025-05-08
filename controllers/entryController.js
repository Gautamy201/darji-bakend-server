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

// delete entry

exports.deleteEntry = async (req, res) => {
  try {
    const deleteEntry = await Entry.findByIdAndDelete(req.params.id);
    if (!deleteEntry) {
      return res.status(404).json({
        message: "Entry not found ",
      });
    }
    res.status(200).json({
      message: "Entry deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "System error",
      error,
    });
  }
};

// update entry

exports.updateEntry = async (req, res) => {
  try {
    const updateEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateEntry) {
      return res.status(404).json({
        message: "Entry not found",
      });
    }
    res.status(200).json({
      message: "Entry updated",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "System Error",
      error,
    });
  }
};

// filter data by date, month , year and plant

exports.filterEntries = async (req, res) => {
  try {
    const { plant, year, month, date } = req.query;
    const filter = {};

    if (plant) {
      filter.plant = plant;
    }

    if (year || month || date) {
      let startDate, endDate;
      if (year && !month && !date) {
        startDate = new Date(`${year}-01-01T00:00.000Z`);
        endDate = new Date(`${year}-12-31T23:59.999Z`);
      }

      if (year && month && !date) {
        startDate = new Date(`${year}-${month}-01T00:00.000Z`);
        endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
      }

      if (year && month && date) {
        startDate = new Date(`${year}-${month}-${date}T00:00.000Z`);
        endDate = new Date(startDate);

        endDate.setDate(endDate.getDate() + 1);
      }

      if (startDate && endDate) {
        filter.createdAt = { $gte: startDate, $lt: endDate };
      }
    }

    const entries = await Entry.find(filter);
    res.status(200).json({
      success: true,
      entries: entries,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "System error",
      error,
    });
  }
};
