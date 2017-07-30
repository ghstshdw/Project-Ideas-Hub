/*----------------------------------------------------------------------------------------
LOGIC:
STEPS:
1. Calculate balance.
    > If negative OUTPUT('The stuff's more expensive')
    > If not calculateChange(balance)
2. calculateChange. Takes balance and can access value_of_change
    > ALGORITHM: 
        Check if balance exceeds or equal to change and OUTPUT('Closed')
        Start from the most valuable denomination and work way down:
            Check: 
                > If current_denomination < balance : add to change_to_be_given,
                subtract from balance and check again.
                > If current_denomination > balance : change denomination and check

ISSUES: 
1. Change denomination names if they are in plural.
----------------------------------------------------------------------------------------*/
var denominations = [
    { name: 'five hundred bob', value: 500, amount: 20 }, 
    { name: 'two hundred bob', value: 200, amount: 20 },
    { name: 'one hundred bob', value: 100, amount: 20 },
    { name: 'fifty bob' , value: 50, amount: 20 },
    { name: 'twenty bob' , value: 20, amount: 20 },
    { name: 'ten bob', value: 10, amount: 20 },
    { name: 'five bob' , value: 5, amount: 20 },
    { name: 'one bob', value: 1, amount: 20 }
];
var changeDue = [];

function getChange() {
    var cost = document.getElementById('cost').value;
    var cash = document.getElementById('cash').value;
    // if any of the fields are empty
    if (!cash || !cost) {
        alert('Both inputs are required');
        return;
    }
    var balance = cash - cost;
    // if the cost is more than the cash received
   if(balance < 0) {
        alert('The stuff is more expensive');
        return;
    }
    chageAlg();
    // Algorithm to calculate change
    function chageAlg(){
        selectDenom();
        // this function looks for the largest available denomination for change
        function selectDenom() {
            for(var i = 0; i < denominations.length; i++){
                if( denominations[i].value <= balance && denominations[i].amount > 0){
                    change(i);
                    return;
                }
            }
        }
        function change(key){
            balance -= denominations[key].value;
            denominations[key].amount-- ;
            //TODO check if the current currency exists in changeDue array and update as necessary
            function match (element) {
                return element.name == denominations[key].name;
            }
            if(changeDue.findIndex(match) == -1){
                let temp = {
                    name: denominations[key].name,
                    amount: 1
                }
                changeDue.push(temp);
            } else {
                changeDue[changeDue.findIndex(match)].amount++;
            }
            if(balance > 0){
                selectDenom();
            } else {
                //change calculated take action
                document.getElementById('output').innerText = null;
                changeDue.forEach((element) => {
                    document.getElementById('output').innerHTML += element.amount + " - " + element.name + "<br>";
                });
            }
            changeDue = [];
        }
    }
}