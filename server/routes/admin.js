const express = require("express");
const router = express.Router();
const server = require('../server.js');
const db = server.db;   

router.post("/lookup", (req, res) => {
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        orderId: req.body.orderNumber
    }
    // if (user.orderId) {
    //     db.query(`SELECT * FROM users WHERE firstName=? AND orderId=?`, [user.firstName, user.orderId], (queryReq, queryRes) => {
    //         console.log(queryReq)
    //     });
    // } else {
    //     db.query(`SELECT * FROM users WHERE firstName=? AND lastName=?`, [user.firstName, user.lastName], (queryReq, queryRes) => {
    //            console.log(queryReq);
    //     });
    // }
    res.render("userPage");
});

module.exports = router;