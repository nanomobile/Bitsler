var nbLoose = 0; // Setting number of looses to zero

var initialBet = 0.00000001 * 1; // Initial bet value. Change it to what fits the best

var speed = 50;

var balanceMin = 0;
var balanceMax = 8000000;

var chance = 10;
var counterMax = 77;
var counter = 0;

setBet(initialBet);
//setPayout(1.1);
setChance(98);

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
	return parseFloat($("#editable-chance-field").val());
}

function getPayout() {
	return parseFloat($("#editable-payout-field").val());
}

function getProfit() {
	return parseFloat($('#history-my-bets-dice tr').first().find('td:last').text());	
}

function getRoll() {
	return parseFloat($('#history-my-bets-dice tr').first().find('td:last').prev().text());
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
	if (getBalance() <= 0) return;
	
	if (initialBet == 0) return;
	
	if (getBalance() >= 0.00000001 * balanceMax || getBalance() <= 0.00000001 * balanceMin) {
		stop();	
		return;
	}
	
	setTimeout(function(){
		roll();
	},speed);

	$(document).ready(function(){
		if (getBalance() <= 0) return;
	
		if (initialBet == 0) return;
	
		if (getBalance() >= 0.00000001 * balanceMax || getBalance() <= 0.00000001 * balanceMin) {
			stop();	
			return;
		}
		
		if (getProfit() > 0 && getChance() < 98) {
			setBet(initialBet);
			setChance(98);
		}
		
		var roll = getRoll();
    
    if (roll >= chance) {
      		counter++;
    } else {
      		counter = 0;
    }
    
    if (counter > counterMax) {
      		console.clear();
      		console.log(counter);
	    	counter = 0;
	    
	    	setBet(initialBet * 20);
		//setPayout(1.1);
		setChance(10);
    } else {
	    	console.clear();
	    	console.log(roll);
	    	console.log(counter);
    }
	});
}, speed * 4);
