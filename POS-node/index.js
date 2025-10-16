const error = require("./middleware/error");
const salesList = require("./routes/salesList");
const salesBill = require("./routes/salesBill");
const expensesList = require("./routes/expensesList");
const expensesBill = require("./routes/expensesBill");
const users = require("./routes/users");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");



if (!config.get("jwtPrivateKey")) {
   console.error("FATAL ERROR : jwtPrivateKey is not defined.");
   process.exit(1);
}


//mongodb+srv://maramghazawi97_db_user:MG010101@cluster0.alqda1l.mongodb.net/? 


mongoose.connect("mongodb+srv://maramghazawi97_db_user:MG010101@cluster0.alqda1l.mongodb.net/pos")
   .then(()=> console.log("Connected to MongoDB..."))
   .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use(cors());

app.use("/api/sales/list", salesList);
app.use("/api/sales/bill", salesBill);
app.use("/api/expenses/list", expensesList);
app.use("/api/expenses/bill", expensesBill);
app.use("/images", express.static("uploads"));
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

const port = process.env.Port || 3900;
app.listen(port, () => console.log(`Listening on port ${port}...`));
