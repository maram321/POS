const { ExpensesBill, validateExpensesBills } = require("../models/expensesBill")
const { ExpensesList } = require("../models/expensesList");
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth")
const express = require("express");

const router = express.Router();


router.post("/new", auth, asyncMiddleware(async (req, res) =>{

    const { error } = validateExpensesBills(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let expensesList = [];
    for (let i=0; i < req.body.list.length; i++) {
        const item = await ExpensesList.findById(req.body.list[i].itemId)
        if (item) {
            expensesList.push({
            "itemName": item.itemName,
            "price": item.price,
            "quantity": req.body.list[i].quantity
            })
        };
    }

        const expensesBill = new ExpensesBill({
            list: expensesList,
            subTotal: req.body.subTotal,
            discount: req.body.discount,
            total: req.body.total,
            date: new Date().setHours(0,0,0,0),
            userId:req.user._id
        })
    
        await expensesBill.save();
    
        res.send(expensesBill);
}))


router.get("/", asyncMiddleware(async (req, res) => {
    const expensesBill = await ExpensesBill.find();
    res.send(expensesBill);
}));

router.get("/:id", asyncMiddleware (async (req, res) => {
    const expensesBill = await ExpensesBill.findById(req.params.id);

    if (!expensesBill) return res.status(404).send("The Bill with the given ID was not found...");
    
    res.send(expensesBill);
}));


router.delete("/:id", asyncMiddleware (async (req, res) => {
    
    const expensesBill = await ExpensesBill.findByIdAndDelete(req.params.id);

    if (!expensesBill) return res.status(404).send("The Bill with the given ID was not found...");
    
    res.send(expensesBill);
}));


module.exports = router;