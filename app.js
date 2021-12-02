const serverURL = require("./configure");
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require("mongoose");
const mongodbURL = serverURL;
mongoose.connect(mongodbURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


const User = require("./models/User.js");
const Activity = require("./models/UserActivity.js");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors()); // for debugging on web browser
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",
  async (req, res, next) => {
    res.render("./index.ejs", { title: 'CPA Server' });
  }
)


app.post("/register",
  async (req, res, next) => {
    try {
      let userEmail = req.body.userEmail;
      let userName = req.body.userName;
      let userPassword = req.body.userPassword;

      const userData = {
        userEmail: userEmail,
        userName: userName,
        userPassword: userPassword,
        registeredAt: new Date(),
      }

      const existed = await User.find({ userEmail: userEmail });
      if (existed.length === 0) {
        let user = new User(userData);
        await user.save();
        res.json({ "status": true });
      } else {
        res.json({ "status": false });
      }
    } catch (error) {
      next(error)
    }
  }
)

app.post("/getUserInfo",
  async (req, res, next) => {
    try {
      let userEmail = req.body.userEmail;

      const existed = await User.find({ userEmail: userEmail });
      if (existed.length === 0) {
        res.json({ "status": false });
      } else {
        let user = existed[0];
        res.json({ "status": true, "userEmail": user.userEmail, "userName": user.userName, "userPassword": user.userPassword, "registeredAt": user.registeredAt });
      }
    } catch (error) {
      next(error);
    }
  }
)
app.post("/updateUserInfo",
  async (req, res, next) => {
    let curEmail = req.body.userEmail;
    let newEmail = req.body.newEmail;
    let userName = req.body.userName;
    let userPassword = req.body.userPassword;

    const existed = await User.find({ userEmail: curEmail });
    if (existed.length === 0) {
      // current email does not exist, update fails
      res.json({ "status": -2 });
    } else {
      const data = {}
      if (newEmail != null) {
        const possible = await User.find({ userEmail: newEmail });
        if (possible.length !== 0) {
          // new email has already linked to another account, update fails
          res.json({ "status": -1 });
        } else {
          data["userEmail"] = newEmail;
        }
      }
      if (userName != null) {
        data["userName"] = userName;
      }
      if (userPassword != null) {
        data["userPassword"] = userPassword;
      }
      await User.updateOne({ userEmail: curEmail }, { $set: data });
      res.json({ "status": 0 });
    }
  }
)

app.post("/setUserActivity",
  async (req, res, next) => {
    let userEmail = req.body.userEmail;
    let area = req.body.area;
    let length = req.body.length;
    let speed = req.body.speed;
    let volume = req.body.volume;
    let weight = req.body.weight;
    let currency = req.body.currency;

    const existed = await Activity.find({ userEmail: userEmail });
    if (existed.length === 0) {
      const userRecord = {
        userEmail: userEmail
      }
      if (area != null) {
        userRecord["area"] = [area]
      } else {
        userRecord["area"] = []
      }
      if (length != null) {
        userRecord["length"] = [length]
      } else {
        userRecord["length"] = []
      }
      if (speed != null) {
        userRecord["speed"] = [speed]
      } else {
        userRecord["speed"] = []
      }
      if (volume != null) {
        userRecord["volume"] = [volume]
      } else {
        userRecord["volume"] = []
      }
      if (weight != null) {
        userRecord["weight"] = [weight]
      } else {
        userRecord["weight"] = []
      }
      if (currency != null) {
        userRecord["currency"] = [currency]
      } else {
        userRecord["currency"] = []
      }

      let record = new Activity(userRecord);
      await record.save();
      res.json({ "status": "insert" });
    } else {
      record = existed[0];
      let areaNew = record.area;
      let lengthNew = record.length;
      let speedNew = record.speed;
      let volumeNew = record.volume;
      let weightNew = record.weight;
      let currencyNew = record.currency;
      if (area != null) {
        areaNew = [...record.area, area]
      }
      if (length != null) {
        lengthNew = [...record.length, length]
      }
      if (speed != null) {
        speedNew = [...record.speed, speed]
      }
      if (volume != null) {
        volumeNew = [...record.volume, volume]
      } if (weight != null) {
        weightNew = [...record.weight, weight]
      }
      if (currency != null) {
        currencyNew = [...record.currency, currency]
      }

      await Activity.updateOne({ "userEmail": userEmail }, { $set: { "area": areaNew, "length": lengthNew, "speed": speedNew, "volume": volumeNew, "weight": weightNew, "currency": currencyNew } });
      res.json({ "status": "update" })
    }
  }
)

app.post("/getUserActivity",
  async (req, res, next) => {
    try {
      let userEmail = req.body.userEmail;

      const existed = await Activity.find({ userEmail: userEmail });
      if (existed.length === 0) {
        res.json({ status: false });
      } else {
        let user = existed[0];
        res.json({ "status": true, "userEmail": user.userEmail, "area": user.area, "length": user.length, "speed": user.speed, "volume": user.volume, "weight": user.weight, "currency": user.currency });
      }
    } catch (error) {
      next(error)
    }
  }
)

module.exports = app;
