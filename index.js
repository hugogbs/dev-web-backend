const express = require('express')
const bodyParser = require("body-parser");

const app = express()

const users = require("./routes/api/user");

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

// Use routes
app.use("/api/user", users);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));


app.get('/api',(req, res) => res.json({ msg: "Olha o pisão!" }));
