const express = require("express");
const router = express.Router();
const server = require('../server.js');
const db = server.db;
router.post("/signup", (req, res) => {
    res.render("adminPage");
});

router.get("/login", (req, res) => {
    res.render("loginPage");
});

router.post("/logUserIn", (req, res) => {
    console.log(req.body);
    var user = {
        id: req.body.id,
        password: req.body.password
    }
    db.query(`SELECT * FROM logins WHERE SUNY_ID=?`, [user.id], (dbreq, res1) => {
        console.log(res1);
        if (!res1[0])
            return res.render("loginPage")
        if (res1[0].SUNY_ID != user.id) {
            console.log("User doesn't exist");
           
            return res.render("loginPage")
        } else {
            if (user.password != res1[0].Pass)
                return res.render("loginPage")
            console.log("User does exist");
            res.render("adminPage");
        }
    });

});

router.post("/newOrder", (req, res) => {
    console.log(req.body);
    res.render("userPage");
});

router.get("/home", (req, res) => {
    res.render("userPage");
}) // DUMMY ROUTE REMOVE FROM FINAL PRODUCT
module.exports = router;