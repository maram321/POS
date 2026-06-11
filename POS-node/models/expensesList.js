const Joi = require("joi");
const mongoose = require("mongoose");


const expensesListSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    catagory: {
        type: String
    },
    
    image: {
        type: String
    },

    userId: {
        type: String,
        required: true  
    }

});

const ExpensesList = mongoose.model("ExpensesList", expensesListSchema);


function validateExpenseItem(expenseItem) {
    const schema = Joi.object({
        itemName : Joi.string().required().min(2).max(30),
        price : Joi.number().required(),
        catagory : Joi.string().required(),
        image: Joi.string(),
        userId: Joi.string()
    });

    return schema.validate(expenseItem);
};


exports.ExpensesList = ExpensesList;
exports.expensesListSchema = expensesListSchema;
exports.validateExpenseItem = validateExpenseItem;
