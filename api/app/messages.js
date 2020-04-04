const express = require('express');

const authorization = require('../middleware/authorization');

const Message = require('../models/Message');

const router = express.Router();

router.get('/', async (req, res) => {
    const messages = await Message.find().sort({"datetime": -1}).populate('user');

    return res.send(messages);
});


router.post('/', authorization, async (req, res) => {

    const user = req.user;

    const messageData = req.body;

    const message = new Message(messageData);

    try {
        message.author = user.displayName;
        await message.save();
        return res.send(message);
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;