const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");

// = to app.js
// Express body parser
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); 

app.set("views", path.join(__dirname, "/../views"));

app.use(express.static(path.join(__dirname, '../public')));
// DB connection
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'keyshop'
});
module.exports.db = db;  
 
db.connect(() => {  
    console.log("Connected to DB");
});

const PORT = ('port', process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// // routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/admin", require("./routes/admin"));

