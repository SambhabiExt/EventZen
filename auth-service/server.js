const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();


app.use(express.json());


app.use(cors());


app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Auth Service Running 🚀");
});

app.listen(5001, () => {
  console.log("Auth service running on port 5001");
});