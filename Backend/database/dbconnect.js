const express = require('express')
const mongoose = require('mongoose');
const app = express()

var dbFlag = mongoose.connect('mongodb://127.0.0.1:27017/musicdb');
console.log(dbFlag);

dbFlag.then(()=>{
  console.log("Database Connected");
}).catch((error)=>{
  console.log("Database Not Connected: " + error);
})

module.exports = dbFlag;
