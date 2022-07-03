const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  content:{
    type: String,
    required: true,
  },

  secondContent: {
    type: String,
    required: true,
  },

  thirdContent: {
    type: String,
    required: true,
  },

  image:{
    type: String,
    required: true,
  },

  secondImage: {
    type: String,
    required: true,
  },

  thirdImage: {
    type: String,
    required: true,
  },

  categories: {
    type: String,
    enum: ['Food Reviews', 'Snack Relief', 'Recipes', 'Drinks'],
    required: true,
  },

date: {
  type: String,
  required: true,
},

});

postSchema.index({ title: 'text', content:'text' });

module.exports = mongoose.model("Post", postSchema);
