const express = require("express");
const mongoose = require("mongoose");

//connect mongoose
mongoose.connect("mongodb://localhost:27017/testclass", {
  useNewUrlParser: true,
});

const app = express();

//create schema
const favouriteFruit = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String,
  });

const humanSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 5,
    max: 30,
    required: [
      true,
      "Please input the required data of the user and it's 'age'.",
    ],
  },
  review: String,
  fruit: favouriteFruit,
});

//create model
const humanModel = new mongoose.model("person", humanSchema);
const fruitModel = new mongoose.model("fruit", favouriteFruit);

//create data for the user.
const fruit = new fruitModel({
  name: "Mango",
  rating: 5,
  review: "This fruit is good for us to eat.",
});
fruit.save(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Saved successfully");
    }
});
const user1 = new humanModel({
  name: "Jemifor Augustine",
  age: 24,
  review: "This is a good person to be around with.",
  fruit: fruit
});
const user2 = new humanModel({
  name: "Jemifor Dinus",
  age: 21,
  review: "This is a great person to be around with.",
  fruit: fruit
});
const user3 = new humanModel({
  name: "Jemifor Titus",
  age: 21,
  review: "This is a nice person to be around with.",
  fruit: fruit
});
const user4 = new humanModel({
  name: "Jemifor Reuben",
  age: 20,
  review: "This is a better person to be around with.",
  fruit: fruit
});
const user5 = new humanModel({
  name: "Jemifor Solomon",
  age: 17,
  review: "This is a best person to be around with.",
  fruit: fruit
});
const user6 = new humanModel({
  name: "Jemifor Pamela",
  age: 15,
  review: "This is a best person to be around.",
  fruit: fruit
});

humanModel.insertMany(
  [user1, user2, user3, user4, user5, user6],
  function (error) {
    if (!error) {
      console.log("Saved successfully !!!");
    } else {
      console.log(error);
    }
  }
);

humanModel.find(function (error, user) {
  if (error) {
    console.log(error);
  } else {
    user.forEach(function (users) {
      console.log(users.name + " " + users.age + ".");
    });
  }
});

humanModel.updateOne({ name: "Jemifor Dinus" }, { age: 21 }, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Updated Successfully");
  }
});

//mongoose.connection.close();

express().listen(3000, function () {
  console.log("Server has successfully started on port 3000");
});
