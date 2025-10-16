const { SalesList, validateSaleItem } = require("../models/salesList")
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

    const { error } = validateSaleItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const saleItem = new SalesList({
        itemName: req.body.itemName,
        price: req.body.price,
        catagory: req.body.catagory,
        image: req.file.filename
    })

    await saleItem.save();

    res.send(saleItem);
}))


router.get("/", asyncMiddleware(async (req, res) => {
    const salesList = await SalesList.find();
    res.send(salesList);
}));

router.get("/:id", asyncMiddleware (async (req, res) => {
    const saleItem = await SalesList.findById(req.params.id);

    if (!saleItem) return res.status(404).send("The Item with the given ID was not found...");
    
    res.send(saleItem);
}));


router.put("/:id", upload.single("image"), asyncMiddleware(async (req, res) =>{

    const { error } = validateSaleItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const sale = await SalesList.findById(req.params.id)

    const saleItem = await SalesList.findByIdAndUpdate(req.params.id, {
        itemName: req.body.itemName,
        price: req.body.price,
        catagory: req.body.catagory
    },
    {new: true})
    if (!saleItem) return res.status(404).send("The Item with the given ID was not found...");

    res.send(saleItem);
}))


router.delete("/:id", asyncMiddleware (async (req, res) => {
    const sale = await SalesList.findById(req.params.id)
    fs.unlink(`uploads/${sale.image}`, ()=>{})
    
    const saleItem = await SalesList.findByIdAndDelete(req.params.id);

    if (!saleItem) return res.status(404).send("The Item with the given ID was not found...");
    
    res.send(saleItem);
}));

module.exports = router;