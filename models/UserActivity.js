"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var userActivitySchema = Schema({
    userEmail: String,
    area: Object,  // the following fields are all arrays
    length: Object,
    speed: Object,
    volume: Object,
    weight: Object,
    currency: Object,
});

module.exports = mongoose.model("UserActivitySchema", userActivitySchema);