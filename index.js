require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('short'))

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (err) => console.error('connection error', err));
db.once('open', () => console.log('Connected to MongoDB'));

const likesSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  count: { type: Number, default: 0 }
});

const LikeModel = mongoose.model('Like', likesSchema);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/reckon", async (req, res) => {
  const reckon = await LikeModel.find({itemId: "Duban_counter"});

  try {
    res.json({"count": reckon[0].count});
  } catch (err) {
    res.status(500).send(err)
  };
});

app.post("/countplus/:id", async (req, res) => {
  try {
  const itemId = req.params.id;

  const updateLike = await LikeModel.findOneAndUpdate(
    {itemId: itemId},
    {$inc: { count: 1 }},
    {new: true },
  );

  res.json(updateLike);
  } catch(err) {
    next(err);
  };

  // await like.save();
  // try {
  //   const like = await LikeModel.find({itemId: itemId});
  //   res.json({"like": like});
  // } catch (err) {
  //   res.status(500).send(err);
  // };
});

app.listen(5000, () => {
  console.log('Server started on port 5000 -- ' + Date(Date.now()).toString());
});
