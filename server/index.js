//importing all the needed tools
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"; //native packajes, this comes with node already
import { fileURLToPath } from "url"; // allow to properly set the paths when confuguring directories
import authRoutes from "/.routes/auth.js"; //routs to a feature like auth
import userRoutes from "/.routes/users.js"; //routs to a feature like auth
import postRoutes from "/.routes/posts.js"; //routs to a feature like auth

import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";

import { verifyToken } from "./middleware/auth.js";


/*Configurations*/
//functions that run in between, in this case use only when use package json with type module

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
console.log(process.env);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //where to store media files (localy in this case)

/* File Storage */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); // name of the folder where a file will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/*Authentication */

/* Routes with files: special case when need to upload a file */
app.post("/auth/register", upload.single("picture"), register); //middleware function to save into storage
//register is a controller a function
app.post("/posts", verifyToken, upload.single("picture"), createPost);//will grab picture property and upload it into the local storage


/*All other routes: */
app.use("/auth", authRoutes); //set up routes to keep files organised and clean
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


/*Mongoose setup */

const PORT = process.env.PORT || 6001;
const url = process.env.MONGO_URL;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect with url: ${url} and post: ${PORT}`));
