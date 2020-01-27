const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const db = require("./models");

const PORT = process.env.PORT || 3000;

//const User = require("./userModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/api/workouts", ({ body }, res) => {
    db.Workout.find({}).then(result => res.json(result));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
