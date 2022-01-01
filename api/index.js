const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const conversationRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages");
const searchRouter = require("./routes/search");
const multer = require("multer");

const app = express();
dotenv.config();
mongoose.connect(process.env.MONGO_URL, 
	{useNewUrlParser: true,
	 useUnifiedTopology: true,
	 useCreateIndex: true,
	 useFindAndModify: false }, 
	 (err) => {
	console.log("connected to Mongo_DB");
});

//middleware

//path to image instead of get request 
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
//multer config for uploading files into db
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null,"public/images");
	},
	filename: (req, file, cb) => {
		cb(null,req.body.name)
	}
})

const upload = multer({storage: storage, limits: { fileSize: 2000000 }});
app.post("/api/upload", upload.single("file"), (req,res) => {
	try{
		return res.status(200).json("File uploaded successfully");
	}catch(err){
		console.log(err.message);
	}
})

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);
app.use("/api/search", searchRouter);


app.listen(8800, () => {
	console.log("server is running")
});