function multiplyBet(coeff){
	$("#amount").val(parseFloat($("#amount").val()) * coeff);
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
	if (getBalance() <= 0) return;
	
	if (initialBet == 0) return;
	
	$("#btn-bet-dice").click();
}

function stop() {
	initialBet = 0;	
}

var nbLoose = 0; // Setting number of looses to zero
var totalProfit = 0; // Total profit made

var initialBet = 0.00000001 * 1; // Initial bet value. Change it to what fits the best  
var betLimit = 128;
var speed = 50;
var wasStart = 0;

var bet = 32;
var payout = 2;
var balanceMin = 100;
var balanceMax = 500;

setBet(initialBet);
setPayout(4);

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
		if (getBalance() <= 0) return;
		
		if (initialBet == 0) return;
		
		var profit = (wasStart == 1) ? getProfit() : 0; // Getting current profit
		wasStart = 1;

		// if loose
		if(profit < 0){
			nbLoose++; // Increment looses
			multiplyBet(2);
			if (getBet() >= 0.00000001 * betLimit || getBet() >= getBalance()) {
				setBet(initialBet);
			}
		}
		// if win
		else {
			nbLoose = 0; // Reseting looses
			setBet(initialBet);
		}
		
		//if (sha512.create().update("" + getRoll()).digest()[Math.ceil(Math.random() * 63)] >= getRoll()) {
			//multiplyBet(2);
			//if (getBet() > 0.00000001 * betLimit) {
				//setBet(initialBet);
			//}
		//}
		
		//if (sha512.create().update("" + getRoll()).digest()[Math.ceil(Math.random() * 63)] <= getRoll()) {
			//setBet(0.00000001 * (Math.ceil(Math.random() * bet) + 1));
		//}
		
		//if (sha512.create().update("" + getRoll()).digest()[Math.ceil(Math.random() * 63)] <= getRoll()) {
			//setPayout(Math.random() * payout + 2);
		//}
		
		//if (sha512.create().update("" + getRoll()).digest()[Math.ceil(Math.random() * 63)] <= sha512.create().update("" + getRoll()).digest()[Math.ceil(Math.random() * 63)]) {
			//changeCondition();
		//}
		
		totalProfit += profit; // Increases current profit to total profit
		
		if (getBalance() >= 0.00000001 * balanceMax || getBalance() <= 0.00000001 * balanceMin) {
			stop();	
		}
		
		//console.log('Total profit: ' +  totalProfit + '\n');
	});
}, speed * 4);
