const {User} = require("../models/user");
const store = require('data-store')({ path: process.cwd() + '/foo.json' });
const config = require("config");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Invalid username or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid username or password");

    const token = jwt.sign({ _id: user._id, name:user.name, username:user.username}, config.get("jwtPrivateKey"));
    res.send(token);
    const currentUser = jwt.verify(token, config.get("jwtPrivateKey"))
    store.set("currentUser", currentUser);
});

function validateUser(req) {
    const schema = Joi.object({
        username : Joi.string().required().min(5).max(30),
        password: Joi.string().required().min(5).max(255),
    });

    return schema.validate(req);
};

module.exports = router;