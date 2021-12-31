const router = require("express").Router();
const User = require("../models/User");
const mongoose = require("mongoose");

//search for user
router.get("/", async (req, res) => {
	const username = req.query.username;
	try {
		const result = await User.find({username: { $regex: `${username}`, $options: 'i' }});
		res.status(200).json(result.map(user=>({_id: user._id, username: user.username, profilePicture: user.profilePicture})));
	} catch(err){
		console.log(err);
		res.status(500).json(err.message);
	}
});

module.exports = router