import mongoose from "mongoose";

// Creating visitor Schema to hold the
// count of visitors
const dobanSchema = new mongoose.Schema({
  title: String,
  actor: String,
  url: String,
  img: String,
  views: Number,
},
{
  timestamps: true
});

// Creating Visitor Table in visitCounterDB
const doban = mongoose.model("Doban", dobanSchema);
export default doban;