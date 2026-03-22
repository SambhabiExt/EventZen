const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");


exports.register = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const checkQuery = "SELECT * FROM users WHERE email = ?";

    db.query(checkQuery, [email], async (err, result) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).json(err);
      }

      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

      db.query(
        insertQuery,
        [name || "User", email, hashedPassword],
        (err, result) => {
          if (err) {
            console.log("INSERT ERROR:", err);
            return res.status(500).json(err);
          }

          res.json({ message: "User registered successfully ✅" });
        }
      );
    });
  } catch (error) {
    console.log("REGISTER CRASH:", error);
    res.status(500).json({ message: "Server crash", error: error.message });
  }
};


exports.login = (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", email);

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  });
};


exports.getUsers = (req, res) => {
  const query = "SELECT id, name, email FROM users";

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
};