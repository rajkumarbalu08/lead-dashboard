const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

const leadsData = require("./data.json");

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "hdfc_team" && password === "leads2025") {
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