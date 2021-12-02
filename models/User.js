"use strict"

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
    userEmail: String,
    userName: String,
    userPassword: String,
    registeredAt: Date,
})

module.exports = mongoose.model("UserSchema", userSchema);
