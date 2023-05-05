import mongoose from "mongoose";

// Creating visitor Schema to hold the
// count of visitors
const guestSchema = new mongoose.Schema({
  ip: String,
  count: Number
},
{
  timestamps: true
});

// Creating Visitor Table in visitCounterDB
const guest = mongoose.model("Guest", guestSchema);
export default guest;