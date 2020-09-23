require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");

// route files
const email = require("./routes/api/email");

const app = express();
const PORT = process.env.PORT || 5000;

// body parser
app.use(express.json());

// loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// security middleware
app.use(helmet());
app.use(xss());

// routers
app.use("/api/email", email);

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
