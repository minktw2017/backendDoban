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

// const dubanCounter = new LikeModel({
//   itemId: "Duban_counter",
// });

// try {
//   async function createData() {
//     await dubanCounter.save();
//     response.send(dubanCounter);
//   };
//   createData();
// } catch (error) {
//   response.status(500).send(error);
// };

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

app.get('/countplus', async (req, res) => {
  const { itemId } = req.params;

  const like = await LikeModel.find({itemId: "Duban_counter"});
  like.count++;
  await like.save();
  try {
    res.json({"count": like.count});
  } catch (err) {
    res.status(500).send(err)
  };
});

app.listen(5000, () => {
  console.log('Server started on port 5000 -- ' + Date(Date.now()).toString());
});
