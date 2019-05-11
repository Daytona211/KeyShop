const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");
const session = require("express-session");

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

//SESSIONS SETUP
app.use(session({
  secret: '410 Is A Class IaM In',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: (1000 * 60 * 60), // 1 hr
    sameSite: true,
   }
}));
module.exports.session = session;

const PORT = ('port', process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// // routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/admin", require("./routes/admin"));
