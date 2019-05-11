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

router.get("/logout", (req, res) => {
    req.session.userId = undefined;
    res.redirect("/");
});

router.post("/logUserIn", (req, res) => {
    console.log(req.body);
    var user = {
        id: req.body.id,
        password: req.body.password
    }
    db.query(`SELECT logins.SUNY_ID, logins.Pass, people.Classification 
    FROM logins INNER JOIN people ON logins.SUNY_ID = people.SUNY_ID WHERE logins.SUNY_ID=?`, [user.id], (dbreq, res1) => {
        console.log(res1);
        if (!res1[0])
            return res.render("loginPage")
        if (res1[0].SUNY_ID != user.id) {
            console.log("User doesn't exist");
            return res.render("loginPage")
        } else {
            if (user.password != res1[0].Pass)
                return res.render("loginPage")
            req.session.userId = res1[0].SUNY_ID;
            req.session.type = res1[0].Classification;
            console.log("User does exist");
            console.log(req.session.type);
            if (req.session.type == "Reslife")
                return res.render("reslifePage", {orders: "", users: ""});
            if (req.session.type == "Keyshop")
                return res.render("adminPage", {orders: "", users: ""});
            if (req.session.type == "Student") {
                return renderStudentsPage(req, res);
            }
        }
    });
});

function renderStudentsPage(req, res) {
    var orders = [];
    db.query(`SELECT * FROM people 
    INNER JOIN orders ON people.SUNY_ID=orders.OrderedBySunyID 
    INNER JOIN rooms ON orders.RoomID=rooms.RoomID 
    WHERE people.SUNY_ID = ?`, [req.session.userId,], (request, res1) => {
        //console.log(res1);
        if (!res1[0])
            return res.render("studentPage", {
                user,
                orders
            })
        for (var i = 0; i < res1.length; i++) {
            var user = {
                id: req.session.userId,
                lastName: "",
                firstName: "",
                quad: "",
                building: "",
                room: ""
            }
            user.lastName = res1[i].LastName;
            user.firstName = res1[i].FirstName;
            user.quad = res1[i].Quad;
            user.building = res1[i].Building;
            user.room = res1[i].RoomNumber;
            var order = {
                id: "",
                orderdBy: "",
                placedBy: "",
                status: "",
                price: ""
            }
            order.id = res1[i].OrderID;
            order.status = res1[i].StatusOfOrder;
            order.price = res1[i].Price;
            orders[i] = order;
        }
        console.log(user)
        console.log(order)
        return res.render("studentPage", {
            user,
            orders
        });
    });
}

module.exports = router;