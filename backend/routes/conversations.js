const express = require("express");
const router = express.Router();

const Conversation = require("../models/conversation");

const checkAuth = require("../middleware/check-auth");

router.post("/", checkAuth, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.userData.userId, req.body.receiverId],
  });

  try {
    const savedConvesation = await newConversation.save();
    res.status(200).json(savedConvesation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", checkAuth, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.userData.userId] },
    });
    res.status(200).json({
      message: "Conversation fetched success",
      conversations: conversation,
      userId: req.userData.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:userId", checkAuth, (req, res, next) => {
  Conversation.find({ members: { $in: [req.params.userId] } }).then(
    (conversation) => {
      console.log(conversation);
      Conversation.deleteOne({ _id: conversation[0]._id }).then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Conversation Deleted!",
          conversation: conversation,
          result: result,
        });
      });
    }
  );
});

module.exports = router;
