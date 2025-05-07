const express = require("express");
const router = express.Router();
const {
  creteEntry,
  getAllEntries,
  getRecentEntries,
} = require("../controllers/entryController");

router.post("/add-entry", creteEntry);
router.get("/entries", getAllEntries);
router.get("/recent-entrys", getRecentEntries);

module.exports = router;
