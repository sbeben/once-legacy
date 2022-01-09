const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req,res) => {
	try {
		//encrypt password	
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		//create new user
		const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword
		});
		//write user info into db
		const user = await newUser.save();
		res.status(200).json(user);
	} catch(err) {
		res.status(500).json(err.message);
	};
});

router.post("/login", async (req, res) => {
	try {
		//check user existance
		const user = await User.findOne({email: req.body.email})
		!user && res.status(404).send("user not found");
		//check password
		const validPassword = await bcrypt.compare(req.body.password, user.password)
		!validPassword && res.status(400).json("wrong password");
		//log in if correct
		const {password, ...other} = user._doc
		res.status(200).json(other);
	} catch(err){
		res.status(500).json(err.message);	
	};
})

module.exports = router