const express = require("express");
const router = express.Router();
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const formErrorsMsg = require("../../utils/formErrorMsg");
const sendEmail = require("../../utils/sendEmail");

const corsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.CORS_ORIGIN) {
      callback(null, true);
    } else {
      callback("Error, not allowed by CORS.");
    }
  },
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ msg: errors.array() });
    }

    const { email, subject, body, lang = "en" } = req.body;

    try {
      await sendEmail(email, subject, body);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        msg:
          lang === "fr"
            ? "Erreur serveur, veuillez réessayer plus tard."
            : "Server error, please try again later.",
      });
    }

    res.json({
      msg:
        lang === "fr"
          ? "Email envoyé avec succès."
          : "Email sent successfully.",
    });
  }
);

module.exports = router;
