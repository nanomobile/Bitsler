var nbLoose = 0; // Setting number of looses to zero
var totalProfit = 0; // Total profit made

var initialBet = 0.00000001 * 10; // Initial bet value. Change it to what fits the best  
var speed = 50;

var balanceMin = 1500000;
var balanceMax = 2000000;
var counter = 0;

setBet(initialBet);
//setPayout(1.1);
setChance(90);

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
	return roll;	
}

function getBalance() {
	return parseFloat($('#balances-lg').first().text());	
}

function roll(){
	if (getBalance() <= 0) return;
	
	if (initialBet == 0) return;
	
	if (getBalance() >= 0.00000001 * balanceMax || getBalance() <= 0.00000001 * balanceMin) {
		stop();	
		return;
	}
	
	$("#btn-bet-dice").click();
}

function stop() {
	initialBet = 0;	
}

setInterval(function() {
	if (initialBet == 0) return;
	
	setTimeout(function(){
		roll();
	},speed);

	$(document).ready(function(){
		if (getBalance() <= 0) return;
		
		if (initialBet == 0) return;
		
		counter++;
		if (counter >= 20) {
			nbLoose = counter = 0;	
		}

		// if loose
		if(profit <= 0){
			nbLoose++;
			if (nbLoose >= 5) {
				setBet(initialBet * 100);
				nbLoose = 0;
			} else {
				setBet(initialBet);
			}
		}
		// if win
		else {
			setBet(initialBet);
		}
		
		totalProfit += profit; // Increases current profit to total profit
		
		//console.log('Total profit: ' +  totalProfit + '\n');
	});
}, speed * 4);
