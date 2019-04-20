function main() {
    var orderBtn = document.getElementById('orderBtn');
    var lookupBtn = document.getElementById('lookupBtn');
    console.log(orderBtn);
    orderBtn.addEventListener("click", () => {
        document.getElementById("newOrder").style.display = "block";        
        document.getElementById("orderLookup").style.display = "none";
    });
    lookupBtn.addEventListener("click", () => {
        document.getElementById("newOrder").style.display = "none";        
        document.getElementById("orderLookup").style.display = "block";
    });

    var lockChangeRadioBtn = document.getElementById('lockChangeRadioBtn');
    var keyRequestRadioBtn = document.getElementById('keyRequestRadioBtn');

    lockChangeRadioBtn.addEventListener("click", () =>{
        keyRequestRadioBtn.checked = false;
    });
    keyRequestRadioBtn.addEventListener("click", () =>{
        lockChangeRadioBtn.checked = false;         
    });
    
    var toBillRadioBtn = document.getElementById('toBillRadioBtn');
    var notBillRadioBtn = document.getElementById('notBillRadioBtn');
    
    toBillRadioBtn.addEventListener("click", ()=>{
        notBillRadioBtn.checked = false;
    }); 
    notBillRadioBtn.addEventListener("click", ()=>{
        toBillRadioBtn.checked = false;
    });

}
document.addEventListener("DOMContentLoaded", function (event) {
    main();
});