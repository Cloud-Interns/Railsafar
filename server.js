const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

//It will look for PORT in env else will start on 8000
const PORT = process.env.PORT || 8000;

//Database connection
connectDB();

//enabling cors
app.use(cors());

//setting static folder for angular
app.use(express.static("angular-src"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/angular-src/index.html"));
});

//Init Middleware
app.use(express.json({ extended: false }));

//Registering Routes
app.use("/api/user", require("./routes/user"));
app.use("/api/user", require("./routes/auth"));
app.use("/api/ticket", require("./routes/ticket"));

//Starting server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
