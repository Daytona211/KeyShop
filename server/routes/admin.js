const express = require('express');
const router = express.Router();
const server = require('../server.js');
const db = server.db;

router.post("/newOrder", (req, res) => {
    console.log(req.body);
    if (req.body.lockChange)
        var price = "$90";
    else
        var price = " $15";
    if (!req.body.toBill)
        price = "$0";

    db.query(`SELECT people.SUNY_ID, rooms.RoomID, people.FirstName, people.LastName FROM people INNER JOIN rooms ON people.SUNY_ID=rooms.SUNY_ID WHERE people.SUNY_ID=?`, [req.body.SUNY_ID], (req1, res1) => {
        if (res1.length > 0) {
            //console.log(res1);
            if (res1[0].FirstName.toUpperCase() != req.body.firstName.toUpperCase() ||
                res1[0].LastName.toUpperCase() != req.body.lastName.toUpperCase()) { // if a firstName or lastName field is wrong
                return res.render("reslifePage", {
                    orders: "",
                    users: "",
                    error: "User's name does not match there SUNY ID confirm input"
                });
            }
            db.query(`SELECT RoomID FROM rooms WHERE Building=? AND RoomNumber=?`, [req.body.building, req.body.roomNum], (req3, res3) => {
                if (res3.length < 1 || res3[0].RoomID != res1[0].RoomID) {
                    return res.render("reslifePage", {
                        orders: "",
                        users: "",
                        error: "Error with building info confirm input"
                    });
                }
            });
            // db.query(`SELECT `)
            console.log(req.body)
            var suiteKey = 0;
            var bedroomKey = 0;
            var mailboxKey = 0;
            var reason = "";
            if (req.body.suiteKey)
                suiteKey = req.body.suiteKey;
            if (req.body.bedroomKey)
                bedKey = req.body.bedroomKey;
            if (req.body.mailboxKey)
                mailKey = req.body.mailboxKey;
            if (req.body.reason)
                reason = req.body.reason;

            db.query(`INSERT INTO orders(OrderedBySunyID, PlacedBySunyID, StatusOfOrder, Price, Reason, NumberOfSuiteKeys, NumberOfBedroomKeys, NumberOfMailboxKeys, RoomID) 
            VALUES(?,?,?,?,?,?,?,?,?);`,
                [req.body.SUNY_ID, "1", "Not Assigned", price, reason, suiteKey, bedKey, mailKey, res1[0].RoomID],
                (req2, res2) => {
                    return res.render("reslifePage", {
                        orders: "",
                        users: ""
                    });
                });
        } else {
            return res.render("reslifePage", {
                orders: "",
                users: "",
                error: "This user does not live anywhere ERROR"
            });
        }
    });
});

router.post("/lookup", (req, res) => {
    var type = req.session.type;
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        orderId: req.body.orderNumber
    }
    //console.log(user)
    var orders = [];
    var users = [];
    var userInfo = {
        id: req.session.userId,
        lastName: "",
        firstName: "",
        quad: "",
        building: "",
        room: ""
    }
    if (user.orderId) {
        let callSP = `CALL getOrderFromOrderId(?);`;
        db.query(callSP, [user.orderId], (request, res1) => {
            if (!res1[0][0]) {
                if (type == "Keyshop")
                    return res.render("adminPage", {
                        orders: "",
                        users: ""
                    });
                else if (type == "Reslife")
                    return res.render("reslifePage", {
                        orders: "",
                        users: ""
                    });
            }
            res1 = res1[0];
            var order = {
                id: user.orderId,
                status: res1[0].StatusOfOrder,
                price: res1[0].Price,
                reason: res1[0].Reason,
                suiteKeyNum: res1[0].NumberOfSuiteKeys,
                roomKeyNum: res1[0].NumberOfBedroomKeys,
                mailKeyNum: res1[0].NumberOfMailboxKeys,
            }
            orders[0] = order;
            userInfo.lastName = res1[0].LastName;
            userInfo.firstName = res1[0].FirstName;
            userInfo.quad = res1[0].Quad;
            userInfo.building = res1[0].Building;
            userInfo.room = res1[0].RoomNumber;
            //console.log(userInfo);
            users[0] = userInfo;
            if (type == "Keyshop")
                return res.render("adminPage", {
                    orders: orders,
                    users: users
                });
            else if (type == "Reslife")
                return res.render("reslifePage", {
                    orders: orders,
                    users: users
                });
        });
    } else if (user.firstName && user.lastName) {
        db.query(`SELECT * FROM people 
        INNER JOIN orders ON people.SUNY_ID=orders.OrderedBySunyID 
        INNER JOIN rooms ON orders.RoomID=rooms.RoomID
        WHERE people.FirstName = ? AND people.LastName = ?`, [user.firstName, user.lastName], (request, res1) => {
            if (!res1[0]) {
                if (type == "Keyshop")
                    return res.render("adminPage", {
                        orders: "",
                        users: ""
                    });
                else if (type == "Reslife")
                    return res.render("reslifePage", {
                        orders: "",
                        users: ""
                    });
            }
            for (var i = 0; i < res1.length; i++) {
                var order = {
                    id: res1[i].OrderID,
                    status: res1[i].StatusOfOrder,
                    price: res1[i].Price,
                    reason: res1[i].Reason,
                    suiteKeyNum: res1[i].NumberOfSuiteKeys,
                    roomKeyNum: res1[i].NumberOfBedroomKeys,
                    mailKeyNum: res1[i].NumberOfMailboxKeys,
                }
                orders[i] = order;
                userInfo.lastName = res1[i].LastName;
                userInfo.firstName = res1[i].FirstName;
                userInfo.quad = res1[i].Quad;
                userInfo.building = res1[i].Building;
                userInfo.room = res1[i].RoomNumber;
                //console.log(userInfo);
                users[i] = userInfo;
            }
            if (type == "Keyshop")
                return res.render("adminPage", {
                    orders: orders,
                    users: users
                });
            else if (type == "Reslife")
                return res.render("reslifePage", {
                    orders: orders,
                    users: users
                });
        });
    } else if (user.firstName) {
        db.query(`SELECT * FROM people 
        INNER JOIN orders ON people.SUNY_ID=orders.OrderedBySunyID 
        INNER JOIN rooms ON orders.RoomID=rooms.RoomID
        WHERE people.FirstName = ?`, [user.firstName], (request, res1) => {
            if (!res1[0]) {
                if (type == "Keyshop")
                    return res.render("adminPage", {
                        orders: "",
                        users: ""
                    });
                else if (type == "Reslife")
                    return res.render("reslifePage", {
                        orders: "",
                        users: ""
                    });
            }
            for (var i = 0; i < res1.length; i++) {
                var order = {
                    id: res1[i].OrderID,
                    status: res1[i].StatusOfOrder,
                    price: res1[i].Price,
                    reason: res1[i].Reason,
                    suiteKeyNum: res1[i].NumberOfSuiteKeys,
                    roomKeyNum: res1[i].NumberOfBedroomKeys,
                    mailKeyNum: res1[i].NumberOfMailboxKeys,
                }
                orders[i] = order;
                userInfo.lastName = res1[i].LastName;
                userInfo.firstName = res1[i].FirstName;
                userInfo.quad = res1[i].Quad;
                userInfo.building = res1[i].Building;
                userInfo.room = res1[i].RoomNumber;
                //console.log(userInfo);
                users[i] = userInfo;
            }
            if (type == "Keyshop")
                return res.render("adminPage", {
                    orders: orders,
                    users: users
                });
            else if (type == "Reslife")
                return res.render("reslifePage", {
                    orders: orders,
                    users: users
                });
        });
    } else if (user.lastName) {
        db.query(`SELECT * FROM people 
        INNER JOIN orders ON people.SUNY_ID=orders.OrderedBySunyID 
        INNER JOIN rooms ON orders.RoomID=rooms.RoomID
        WHERE people.LastName = ?`, [user.lastName], (request, res1) => {
            if (!res1[0]) {
                if (type == "Keyshop")
                    return res.render("adminPage", {
                        orders: "",
                        users: ""
                    });
                else if (type == "Reslife")
                    return res.render("reslifePage", {
                        orders: "",
                        users: ""
                    });
            }
            for (var i = 0; i < res1.length; i++) {
                // console.log(res1[i].OrderID)
                var order = {
                    id: res1[i].OrderID,
                    status: res1[i].StatusOfOrder,
                    price: res1[i].Price,
                    reason: res1[i].Reason,
                    suiteKeyNum: res1[i].NumberOfSuiteKeys,
                    roomKeyNum: res1[i].NumberOfBedroomKeys,
                    mailKeyNum: res1[i].NumberOfMailboxKeys,
                }
                orders[i] = order;
                userInfo.lastName = res1[i].LastName;
                userInfo.firstName = res1[i].FirstName;
                userInfo.quad = res1[i].Quad;
                userInfo.building = res1[i].Building;
                userInfo.room = res1[i].RoomNumber;
                //console.log(userInfo);
                users[i] = userInfo;
            }
            if (type == "Keyshop")
                return res.render("adminPage", {
                    orders: orders,
                    users: users
                });
            else if (type == "Reslife")
                return res.render("reslifePage", {
                    orders: orders,
                    users: users
                });
        });
    } else {
        return res.render("adminPage", {
            orders: "",
            users: ""
        });
    }
});

router.post("/alterOrder", (req, res) => {
    console.log("REEEEEEEEEEEEEEEEEEEEEE")
    console.log(req.body);
    var info = req.body.content;
    console.log(info)
    db.query(`UPDATE orders SET StatusOfOrder=?, Price=?, Reason=?, NumberOfSuiteKeys=?, NumberOfBedroomKeys=?, NumberOfMailboxKeys=?
    WHERE OrderID=?;`,
        [info.status, info.price, info.reason, info.suiteKeyNum, info.roomKeyNum, info.mailKeyNum, info.id],
        (req, res) => {
            console.log(res);
        });
    return res.send({
        redirectRoute: '/admin/newOrder'
    });
    // return res.render("adminPage", {
    //     orders: "",
    //     users: ""
    // }); 
});

router.post("/deleteOrder", (req, res)=>{
    console.log(req.body);
    var id = req.body.id;
    db.query(`DELETE FROM orders WHERE OrderID=?;`, [id]);
    return;
});

module.exports = router;