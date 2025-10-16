const { SalesBill, validateSalesBills } = require("../models/salesBill");
const { SalesList } = require("../models/salesList");
const asyncMiddleware = require("../middleware/async");
const store = require('data-store')({ path: process.cwd() + '/foo.json' });
const express = require("express");

const router = express.Router();

const currentUser = store.get("currentUser");

router.post("/new", asyncMiddleware(async (req, res) =>{

    const { error } = validateSalesBills(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    let salesList = [];
    for (let i=0; i < req.body.list.length; i++) {
        const item = await SalesList.findById(req.body.list[i].itemId)
        if (item) {
            salesList.push({
            "itemName": item.itemName,
            "price": item.price,
            "quantity": req.body.list[i].quantity
            })
        };
    }

        const salesBill = new SalesBill({
            list: salesList,
            subTotal: req.body.subTotal,
            discount: req.body.discount,
            total: req.body.total,
            date: new Date().setHours(0,0,0,0),
            userId: currentUser._id
        })
    
        await salesBill.save();
    
        res.send(salesBill);
    
}))


router.get("/", asyncMiddleware(async (req, res) => {
    const salesBill = await SalesBill.find();
    res.send(salesBill);
}));

router.get("/:id", asyncMiddleware (async (req, res) => {
    const salesBill = await SalesBill.findById(req.params.id);

    if (!salesBill) return res.status(404).send("The Bill with the given ID was not found...");
    
    res.send(salesBill);
}));


router.delete("/:id", asyncMiddleware (async (req, res) => {
    
    const salesBill = await SalesBill.findByIdAndDelete(req.params.id);

    if (!salesBill) return res.status(404).send("The Bill with the given ID was not found...");
    
    res.send(salesBill);
}));


module.exports = router;