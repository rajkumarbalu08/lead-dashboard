require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

const leadsData = require("./data.json");
const validUser = { username: process.env.USERNAME, password: process.env.PASSWORD };

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === validUser.username && password === validUser.password) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/leads", (req, res) => {
    res.json(leadsData);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});