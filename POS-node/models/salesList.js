const Joi = require("joi");
const mongoose = require("mongoose");
const store = require('data-store')({ path: process.cwd() + '/foo.json' });

const currentUser = store.get("currentUser");

const salesListSchema = new mongoose.Schema({
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
        default: currentUser._id
        
    }

});

const SalesList = mongoose.model("SalesList", salesListSchema);


function validateSaleItem(saleItem) {
    const schema = Joi.object({
        itemName : Joi.string().required().min(2).max(30),
        price : Joi.number().required(),
        catagory : Joi.string().required(),
        image: Joi.string()
    });

    return schema.validate(saleItem);
};


exports.SalesList = SalesList;
exports.salesListSchema = salesListSchema;
exports.validateSaleItem = validateSaleItem;
