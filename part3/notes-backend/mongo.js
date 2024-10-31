const mongoose = require("mongoose");

require("dotenv").config();

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];

const password = process.env.VITE_MONGODB_URI_PW;
const username = process.env.VITE_MONGODB_URI_USERNAME;

const url = `mongodb+srv://${username}:${password}@zuesuep.8bkzlbx.mongodb.net/fullstackopen?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  // mongoose.connection.close();
});
