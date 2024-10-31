const mongoose = require("mongoose");
const dotenv = require("dotenv");

require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: Number,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    console.log("before transform", returnedObject);

    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;

    console.log(returnedObject);
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
