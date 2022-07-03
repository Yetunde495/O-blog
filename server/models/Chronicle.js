const mongoose = require("mongoose");

const chronicleSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },

  foodsummary:{
    type: String,
    required: true,
  },

  foodstory:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Chronicle", chronicleSchema);
