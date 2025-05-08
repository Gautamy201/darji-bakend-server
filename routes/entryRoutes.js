const express = require("express");
const router = express.Router();
const {
  creteEntry,
  getAllEntries,
  getRecentEntries,
  filterEntries,
  updateEntry,
  deleteEntry,
} = require("../controllers/entryController");

router.post("/add-entry", creteEntry);
router.get("/entries", getAllEntries);
router.get("/recent-entrys", getRecentEntries);
router.get("/entries-filter", filterEntries);
router.put("/entries-update/:id", updateEntry);
router.delete("/entries-delete/:id", deleteEntry);

module.exports = router;
