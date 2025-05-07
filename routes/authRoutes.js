const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const ADMIN_ID = process.env.ADMIN_ID;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  const { id, password } = req.body;

  if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
    res.status(200).json({
      success: true,
      message: "Login Successful",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  }
});

module.exports = router;
