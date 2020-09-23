const express = require("express");
const router = express.Router();
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const formErrorsMsg = require("../../utils/formErrorMsg");

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};

router.post(
  "/send",
  [
    cors(corsOptions),
    check("email")
      .isEmail()
      .withMessage((value, { req }) => formErrorsMsg(value, req, "email")),
    check("subject")
      .isLength({ min: 4 })
      .withMessage((value, { req }) => formErrorsMsg(value, req, "subject")),
    check("body")
      .isLength({ min: 4 })
      .withMessage((value, { req }) => formErrorsMsg(value, req, "body")),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ msg: errors.array() });
    }

    const { lang, email, subject, body } = req.body;

    res.json({ msg: "hey everything is great" });
  }
);

module.exports = router;
