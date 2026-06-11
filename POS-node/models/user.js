const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model("User", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
    },

    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
        unique: true
    },
    
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }

}));


function validateUser(user) {
    const schema = Joi.object({
        name : Joi.string().required().min(3).max(30),
        username : Joi.string().required().min(5).max(30),
        password: Joi.string().required().min(5).max(255)
    });

    return schema.validate(user);
};

exports.User = User;
exports.validateUser = validateUser;