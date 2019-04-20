const express = require("express");
const router = express.Router();

//Home Page Route
router.get("/", (req, res)=>{
    res.render("frontPage");
});

//Register Page Route 
router.get("/register", (req, res)=>{
    res.render("registerPage");
});


module.exports = router;