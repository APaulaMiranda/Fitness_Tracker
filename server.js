const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

const db = require("./models");

const PORT = process.env.PORT || 3000;

//const User = require("./userModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/api/workouts", (_, res) => {
    db.Workout.find({}).then(result => res.json(result));
});

app.get("/api/workouts/:id", (req, res) => {
    db.Workout.findById(req.params.id).then(result => res.json(result));
});

app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id, { exercises: req.body })
        .then(dbTransaction => {
            res.json(dbTransaction);
        }).catch(err => res.json(err));
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body).then(dbTransaction => {
        res.json(dbTransaction);
    }).catch(err => res.json(err));
});



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
