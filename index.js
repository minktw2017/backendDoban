import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import countRoutes from "./routes/count.js";
import guestRoutes from "./routes/guest.js";
import dobanRoutes from "./routes/doban.js";
import { verifyToken } from "./middleware/auth.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import Doban from "./models/Doban.js";
// import { users, posts } from "./data/index.js";
// import { videos } from "./data/doban.js";

// * CONFIGURATIONS * //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// * FILE STORAGE * //
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/assets");
  },
  filenane: function(req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage }); 

// *  ROUTE WITH FILES * //
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// * ROUTE * //
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.use("/guest", guestRoutes);
app.use("/count", countRoutes);
app.use("/doban", dobanRoutes);

app.get("/test", (req, res) => {
  const ipAddress = req.socket.remoteAddress;
  res.send(ipAddress);
});

// * MONGOOSE SETUP * //
const PORT = process.env.PORT
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, (req, res) => console.log(`Server Listen on Port: ${PORT}.`));

  // * ADD FAKE DATA AT ONE TIME * //
  // User.insertMany(users);
  // Post.insertMany(posts);
  // Doban.insertMany(videos);
}).catch((error) => console.log(`${error} did not connet`));
