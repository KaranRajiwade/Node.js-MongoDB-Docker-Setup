const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
const MONGO_URL = "mongodb://admin:qwerty@mango:27017";

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let client;

// Connect to MongoDB once at startup
async function connectDB() {
  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
connectDB();

// GET all users
app.get("/getUsers", async (req, res) => {
  try {
    const db = client.db("apnacollege-db");
    const data = await db.collection("users").find({}).toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// POST new user
app.post("/addUser", async (req, res) => {
  try {
    const userObj = req.body;
    console.log(req.body);

    const db = client.db("apnacollege-db");
    const data = await db.collection("users").insertOne(userObj);

    console.log("Data inserted in DB:", data);
    res.send("User added successfully");
  } catch (err) {
    res.status(500).send("Error adding user");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
