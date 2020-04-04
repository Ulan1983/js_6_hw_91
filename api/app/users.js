const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const authorization = require('../middleware/authorization');

const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', authorization, async (req, res) => {
    try {
        const user = await User.find({_id: req.user._id});
        res.send(user)
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/', upload.single('image'), async (req, res) => {

    const userData = req.body;

    if (!userData.image) {
        userData.image = 'fixtures/user.png'
    }

    const user = new User(userData);

    try {
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    user.generateToken();
    await user.save();
    return res.send(user);
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Success'};

    try {
        const token = req.get('Authorization').split(' ')[1];

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.generateToken();
        await user.save();

        return res.send(success);
    } catch (e) {
        return res.send(success);
    }
});

router.put('/', authorization, upload.single('image'), async (req, res) => {

    const userData = req.body;

    const user = await User.findOne({_id: req.user._id});

    if (req.file) {
        userData.image = req.file.filename;
    }

    if (userData.image) {
        user.image = userData.image
    }

    if (userData.displayName) {
        user.displayName = userData.displayName
    }

    try {
        await user.save();
        return res.send(user);
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;