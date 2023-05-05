import mongoose from "mongoose";

// Creating visitor Schema to hold the
// count of visitors
const visitorSchema = new mongoose.Schema({
  name: String,
  count: Number
},
{
  timestamps: true
});

// Creating Visitor Table in visitCounterDB
const visitor = mongoose.model("Visitor", visitorSchema);
export default visitor;