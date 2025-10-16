const { ExpensesList, validateExpenseItem } = require("../models/expensesList")
const asyncMiddleware = require("../middleware/async");
const fs = require("fs");
const multer = require("multer");
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
});
const upload = multer({storage:storage})

router.post("/new", upload.single("image"),  asyncMiddleware(async (req, res) =>{

    const { error } = validateExpenseItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const expenseItem = new ExpensesList({
        itemName: req.body.itemName,
        price: req.body.price,
        catagory: req.body.catagory,
        image: req.file.filename
    })

    await expenseItem.save();

    res.send(expenseItem);
}))

router.get("/", asyncMiddleware(async(req,res) => {
    const expensesList = await ExpensesList.find();
    res.send(expensesList);
}));


router.get("/:id", asyncMiddleware (async (req, res) => {
    const expenseItem = await ExpensesList.findById(req.params.id);

    if (!expenseItem) return res.status(404).send("The Item with the given ID was not found...");
    
    res.send(expenseItem);
}));


router.put("/:id", upload.single("image"), asyncMiddleware(async (req, res) =>{

    const { error } = validateExpenseItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const expense = await ExpensesList.findById(req.params.id)
    fs.unlink(`uploads/${expense.image}`, ()=>{})

    const expenseItem = await ExpensesList.findByIdAndUpdate(req.params.id, {
        itemName: req.body.itemName,
        price: req.body.price,
        catagory: req.body.catagory,
        image: req.file.filename
    },
    {new: true})
    if (!expenseItem) return res.status(404).send("The Item with the given ID was not found...");

    res.send(expenseItem);
}))


router.delete("/:id", asyncMiddleware (async (req, res) => {
    const expense = await ExpensesList.findById(req.params.id)
    fs.unlink(`uploads/${expense.image}`, ()=>{})
    
    const expenseItem = await ExpensesList.findByIdAndDelete(req.params.id);

    if (!expenseItem) return res.status(404).send("The Item with the given ID was not found...");
    
    res.send(expenseItem);
}));

module.exports = router;