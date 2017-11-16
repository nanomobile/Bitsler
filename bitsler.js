function multiplyBet(coeff){
	$("#amount").val(parseFloat($("#amount").val())*coeff);
}

function getBet() {
	return parseFloat($("#amount").val());	
}

function setBet(value){
	$("#amount").val(value);
}

function changeCondition() {
	roll_by_condition();
	//console.log("Change Condition");
}

function setChance(value) {
	$("#editable-chance").text(value + "%");
	$("#editable-chance-field").val(value);
	roll_by_chance(value);
}

function setPayout(value) {
	$("#editable-payout").text(value + "x");
	$("#editable-payout-field").val(value);
	roll_by_payout(value);
}

function getChance() {
	var chance = parseFloat($("#editable-chance-field").val());
	//console.log("Chance = " + chance);
	return chance;
}

function getPayout() {
	return parseFloat($("#editable-payout-field").val());
}

function getProfit() {
	return parseFloat($('#history-my-bets-dice tr').first().find('td:last').text());	
}

function getRoll() {
	var roll = parseFloat($('#history-my-bets-dice tr').first().find('td:last').prev().text());
	//console.log("Roll = " + roll);
	return roll;	
}

function getBalance() {
	return parseFloat($('#balances-lg').first().text());	
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

var bet = getBet(); // Stocking current bet value
var nbLoose = 0; // Setting number of looses to zero
var totalProfit = 0; // Total profit made

var initialBet = 0.00000001 * 1; // Initial bet value. Change it to what fits the best  
var betLimit = 64;
var speed = 10;

setBet(initialBet);
setPayout(2);

// Restarts the sequence every 2000ms
setInterval(function() {
	if (initialBet == 0) return;
	
	//console.log('Rolling...\n');

	// Waiting 500ms after rolling the dice in case of lag
	setTimeout(function(){
		roll();
	},speed);

	// Waiting for the page to be fully loaded
	$(document).ready(function(){
		if (initialBet == 0) return;
		
		var profit = getProfit(); // Getting current profit

		// if loose
		if(profit < 0){
			nbLoose++; // Increment looses
			//multiplyBet(2);
			//if (getBet() > 0.00000001 * betLimit) {
				//setBet(initialBet);
			//}
		}
		// if win
		else {
			nbLoose = 0; // Reseting looses
			setBet(initialBet);
		}
		
		if (Math.random() * 100 > getRoll()) {
			setChance(0.98 * Math.random() * 100 + 2);
		}
		
		if (Math.random() * 100 > getRoll()) {
			changeDirection();
		}

		totalProfit += profit; // Increases current profit to total profit
		//console.log('Total profit: ' +  totalProfit + '\n');
	});
}, speed * 4);
