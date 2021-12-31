const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//update user
router.put("/:id", async (req,res) => {
	//check if user id matches id in request or if it is an admin
	console.log(req.body);
	if(req.body.userId === req.params.id || req.body.isAdmin){
		//if user changes his password we have to encrypt it again
		if(req.body.password){
			try{
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch(err) {
				console.log(err);
				return res.status(500).json(err.message);
			}
		}
		//put all the changes into db
		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body
			});
			console.log("changed user:", user);
			res.status(200).json(user);
		} catch(err) {
			console.log(err);
			return res.status(500).json(err.message);
		}
	} else {
		return res.status(403).json("You can not update an account which is not yours");
	}
});

//delete user
router.delete("/:id", async (req,res) => {
	//check if user id matches id in request or if it is an admin
	if(req.body.userId === req.params.id || req.body.isAdmin){
		try {
			const user = await User.findByIdAndDelete(req.params.id);
			res.status(200).json("Account has been deleted");
		} catch(err) {
			console.log(err);
			return res.status(500).json(err.message);
		}
	} else {
		return res.status(403).json("You can not delete someone else's account");
	}
});

//get a user
router.get("/", async (req, res) => {
	console.log(req.query)
	const userId = req.query.userId;
	const username = req.query.username;
	try {
		const user = userId ? await User.findById(userId) : await User.findOne({username: username});
		const {password, updatedAt, ...other} = user._doc
		res.status(200).json(other);
	} catch(err){
		console.log(err);
		res.status(500).json(err.message);
	}
});

//get contacts
router.get("/friends/:userId", async (req,res) => {
	try{
		console.log("request contacts of user:", req.params);
		const user = await User.findById(req.params.userId);
		console.log("got user:", user);
		const contacts = await Promise.all(
			user.follows.map(friendId => {
				return User.findById(friendId)
			})
		);
		console.log("his contacts:", contacts)
		let contactList = [];
		contacts.map(friend => {
			const {_id, username, profilePicture} = friend;
			contactList.push({_id, username, profilePicture});
			res.status(200).json(contactList);
		})
	}catch(err){
		console.log(err.message);
		res.status(500).json(err.message);
	}
})

//follow a user
router.put("/:id/follow", async (req, res) => {
	//check if its not the same user
	if(req.body.userId !== req.params.id){
		try {
			//wanted user
			const user = await User.findById(req.params.id);
			//current user
			const currentUser = await User.findById(req.body.userId);
			//check if he's not followed already
			if(!user.followers.includes(req.body.userId)){
				//if not - update arrays of followers
				await user.updateOne({$push:{followers:req.body.userId}});
				await currentUser.updateOne({$push:{follows:req.params.id}});
				res.status(200).json("User has been followed");
			} else {
				res.status(403)("You are already follow this user");
			}
		} catch(err) {
			console.log(err);
			res.status(500).json(err.message);
		}
	} else {
		res.status(403).json("You don't need to follow yourself");
	}
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
	//check if its not the same user
	if(req.body.userId !== req.params.id){
		try {
			//wanted user
			const user = await User.findById(req.params.id);
			//current user
			const currentUser = await User.findById(req.body.userId);
			//check if he's been followed
			if(user.followers.includes(req.body.userId)){
				//if yes - update arrays of followers
				await user.updateOne({$pull:{followers:req.body.userId}});
				await currentUser.updateOne({$pull:{follows:req.params.id}});
				res.status(200).json("User has been unfollowed");
			} else {
				res.status(403)("You don't follow this user");
			}
		} catch(err) {
			console.log(err);
			res.status(500).json(err.message);
		}
	} else {
		res.status(403).json("You don't need to unfollow yourself");
	}
});


module.exports = router