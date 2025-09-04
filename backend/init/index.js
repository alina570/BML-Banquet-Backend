const mongoose = require('mongoose');
const Event = require("../models/event");
const initData = require ("./data")


main().then(() => {
    console.log("connected to db");
  }).catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/bookify');

}

const initDB = async () =>{
    await Event.deleteMany({});
    await Event.insertMany(initData.data);
    console.log("data was initialyzed");
};

initDB();