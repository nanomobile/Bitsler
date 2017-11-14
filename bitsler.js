var initialBet = 0.00000010; // Initial bet value. Change it to what fits the best  

function multiplyBet(coeff){
	$("#amount").val(parseFloat($("#amount").val())*coeff);
}

function getBet() {
	return parseFloat($("#amount").val());	
}

function setBet(value){
	$("#amount").val(value);
}

/** 
Rolls the dice
*/
function roll(){
	if (initialBet == 0) return;
	
	$("#btn-bet-dice").click();
}

function stop() {
	initialBet = 0;	
}

setBet(initialBet);

console.log(getBet());

var balance = parseFloat($('#balances-lg').first().text());
console.log(balance);

var bet = parseFloat($("#amount").val()); // Stocking current bet value
var nbLoose = 0; // Setting number of looses to zero
var totalProfit = 0; // Total profit made

// Restarts the sequence every 2000ms
setInterval(function() {
	if (initialBet == 0) return;
	
	//console.log('Rolling...\n');

	// Waiting 500ms after rolling the dice in case of lag
	setTimeout(function(){
		roll();
	},100);

	// Waiting for the page to be fully loaded
	$(document).ready(function(){
		if (initialBet == 0) return;
		
		var profit = $('#history-my-bets-dice tr').first().find('td:last').text(); // Getting current profit

		// if loose
		if(profit.includes('-')){
			nbLoose++; // Increment looses
			if (nbLose <= 1) {
				multiplyBet(10);
			} else {
				setBet(initialBet);
			}
		}
		// if win
		else{
			nbLoose = 0; // Reseting looses
			setBet(initialBet);
		}

		totalProfit += parseFloat(profit); // Increases current profit to total profit
		//console.log('Total profit: ' +  totalProfit + '\n');
	});
}, 400);


