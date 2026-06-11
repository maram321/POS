const Joi = require("joi");
const mongoose = require("mongoose");
const {expensesListSchema} = require("./expensesList");

const ExpensesBill = mongoose.model("ExpensesBill", new mongoose.Schema({
    list: [
        {
            itemName: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    subTotal: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        required: true
    },
    
    total: {
        type: Number,
        required: true
    },
    
    date: {
        type: Date,
        default: new Date().setHours(0,0,0,0),
        required: true,
    },

    userId: {
        type: String,
        required: true  
    }

}));


function validateExpensesBills(expenseBill) {
    const schema = Joi.object({
        list : Joi.array().items(Joi.object().keys({
            itemId: Joi.string().required(),
            quantity: Joi.number().required(),
        })),
        subTotal : Joi.number().required(),
        discount : Joi.number().required(),
        total : Joi.number().required(),
        userId: Joi.string()
    })

    return schema.validate(expenseBill);
};


exports.ExpensesBill = ExpensesBill;
exports.validateExpensesBills = validateExpensesBills;
