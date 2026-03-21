require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let expenses = [];
let idCounter = 1;

app.get("/expenses", (req, res) => {
    res.json(expenses);
});

app.post("/expenses", (req, res) => {
    const expense = req.body;
    expense.id = idCounter++;
    expenses.push(expense);
    res.json({ message: "Expense added" });
});

app.delete("/expenses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    expenses = expenses.filter(e => e.id !== id);
    res.json({ message: "Expense deleted" });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Budget service running on port ${PORT}`);
});