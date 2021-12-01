const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conversation
router.post("/", async (req,res) => {
	const isExist = await Conversation.findOne({
		members: {
				$all:  [req.body.senderId, req.body.receiverId]
		}
	})
	console.log(isExist);
	if(!isExist){
		const newConversation = new Conversation({
			members:
				[
					req.body.senderId,
					req.body.receiverId
				]
		});
		try {
			const savedConversation = await newConversation.save();
			res.status(200).json(savedConversation);
		} catch(err) {
			res.status(500).json(err.message);
		}
	}
});


//get user's conversations

router.get("/:userId", async (req, res) => {
	try {
		const conversation = await Conversation.find({
			members: { $in: [req.params.userId] }
		});
		res.status(200).json(conversation);
	} catch(err) {
		res.status(500).json(err.message);
	}
})

module.exports = router;