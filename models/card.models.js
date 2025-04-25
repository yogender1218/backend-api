const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,'Title dena zaroori hai']
  },
  subtitle:{
    type:String,
    required:[true,'Subtitle dena zaroori hai']
  },
  description:{
    type:String,
    required:[true,'Description dena zaroori hai']
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:[true,'User linked hona zaroori hai']
  }
},{timestamps:true});


const Card = mongoose.model('Card', cardSchema);
module.exports = Card;