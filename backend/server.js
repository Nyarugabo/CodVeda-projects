// ------------------------------
// 1️⃣ Import Express & Create App
// ------------------------------
const express = require("express");
const app = express();
const PORT = 5000;

// ------------------------------
// 2️⃣ Middleware
// ------------------------------
app.use(express.json()); // allows us to parse JSON in requests

// ------------------------------
// 3️⃣ Temporary Database
// ------------------------------
let users = [
  { id: 1, name: "Daniel", email: "daniel@example.com", password: "danny123" },
  { id: 2, name: "Alice", email: "alice@example.com", password: "Alice123" },
];

// ------------------------------
// 4️⃣ Test Route
// ------------------------------
app.get("/", (req, res) => {
  res.send("API is running");
});

// ------------------------------
// 5️⃣ CRUD Routes
// ------------------------------

// 🔹 READ: Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// 🔹 READ: Get single user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// 🔹 CREATE: Add a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1, // simple auto-increment ID
    name,
    email,
    password,
  };
  users.push(newUser);
  res.status(201).json(newUser); // 201 = Created
});

// 🔹 UPDATE: Update a user by ID
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password;

  res.json(user);
});

// 🔹 DELETE: Delete a user by ID
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ message: "User not found" });

  const deletedUser = users.splice(userIndex, 1); // remove user
  res.json(deletedUser[0]);
});

// ------------------------------
// 6️⃣ Start Server
// ------------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
