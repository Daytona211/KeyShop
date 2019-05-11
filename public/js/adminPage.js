var originalContent;
var content;

function main() {

    //for(var i = 0; i < )
    $(".editBtn").click(function (event) {
        alert("You may only edit the price, reason, and # of keys. If you wish to redefine other fields delete and make a new order");
        var ele = ($($(event.target).parent().parent()));
        makeEditable(ele);
        // endEditable(ele) 
    });
    $(".saveBtn").click(function (event) {
        var ele = ($($(event.target).parent().parent()));
        endEditable(ele)
    });
    $(".deleteBtn").click(function (event) {
        var ele = ($($(event.target).parent().parent()));
        var val = ele.children()[0].innerText;
        deleteEntry(val, ele);
    });
    $("#orderBtn").click(function (event) {
        document.getElementById("newOrder").style.display = "block";
        document.getElementById("orderLookup").style.display = "none";
    });
    $("#lookupBtn").click(function (event) {
        document.getElementById("orderLookup").style.display = "block";
        document.getElementById("newOrder").style.display = "none";
    });
}

function deleteEntry(id, ele) {
    var confirmAlrt = confirm("Are you sure you wish to delete order with id: " + id);
    if (confirmAlrt == true) {
        const url = window.location.origin + "/admin/deleteOrder";
        $.post(url, {
            id
        }, function (data, status) {
            console.log(data);
        });
        ele[0].remove();
    }
}

function submitEdits(content) {
    // console.log(content);
    // console.log(content);
    // console.log("az");
    // console.log(window.location.href);  
    const url = window.location.origin + "/admin/alterOrder";
    $.post(url, {
        content
    }, function (data, status) {
        console.log(data);
    });
}

function makeEditable(ele) {
    originalContent = {
        id: ele.children()[0].innerHTML,
        firstName: ele.children()[1].innerHTML,
        lastName: ele.children()[2].innerHTML,
        quad: ele.children()[3].innerHTML,
        building: ele.children()[4].innerHTML,
        room: ele.children()[5].innerHTML,
        status: ele.children()[6].innerHTML,
        price: ele.children()[7].innerHTML,
        reason: ele.children()[8].innerHTML,
        suiteKeyNum: ele.children()[9].innerHTML,
        roomKeyNum: ele.children()[10].innerHTML,
        mailKeyNum: ele.children()[11].innerHTML,
    }

    ele.children()[13].style.display = "block";
    for (var i = 6; i < 12; i++) {
        ele.children()[i].contentEditable = true;
    }
}

function endEditable(ele) {
    ele.children()[13].style.display = "none";
    content = {
        id: '',
        firstName: '',
        lastName: '',
        quad: '',
        building: '',
        room: '',
        status: '',
        price: '',
        reason: '',
        suiteKeyNum: '',
        roomKeyNum: '',
        mailKeyNum: ''
    }

    for (var i = 1; i < 12; i++) {
        ele.children()[i].contentEditable = false;
    }
    content.id = ele.children()[0].innerHTML;
    content.firstName = ele.children()[1].innerHTML;
    content.lastName = ele.children()[2].innerHTML;
    content.quad = ele.children()[3].innerHTML;
    content.building = ele.children()[4].innerHTML;
    content.room = ele.children()[5].innerHTML;
    content.status = ele.children()[6].innerHTML;
    content.price = ele.children()[7].innerHTML;
    content.reason = ele.children()[8].innerHTML;
    content.suiteKeyNum = ele.children()[9].innerHTML;
    content.roomKeyNum = ele.children()[10].innerHTML;
    content.mailKeyNum = ele.children()[11].innerHTML;

    submitEdits(content);
}

document.addEventListener("DOMContentLoaded", function (event) {
    main();
});