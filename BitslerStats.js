var nbLoose = 0; // Setting number of looses to zero

var initialBet = 0.00000001 * 1; // Initial bet value. Change it to what fits the best

var speed = 50;

var balanceMin = 0;
var balanceMax = 8000000;

var chance = 49.50;
var counterMax = 11;
var coeff = 1;
var counterLow = 0;
var counterHigh = 0;

var isLow = true;

var initialChance = 98;

setBet(initialBet);
//setPayout(1.1);
setChance(initialChance);

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
	isLow = !isLow;
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
		
		if (getProfit() > 0 && getChance() == chance) {
			setBet(initialBet);
			setChance(initialChance);
		} else if (getProfit() < 0 && getChance() == chance) {
			setBet(getBet() * 2);	
		}
		
		var roll = getRoll();
    
        if (getChance() == initialChance) {
            if (roll >= chance) {
                    counterLow++;
            } else {
                    counterLow = 0;
			}
			
			if (roll <= 100 - chance) {
				counterHigh++;
			} else {
				counterHigh = 0;
			}
        }
    
        if (counterLow > counterMax && getChance() == initialChance) {
      		console.clear();
      		console.log(counterLow);
	    	counterLow = counterHigh = 0;
	    
	    	setBet(initialBet * coeff);
		    //setPayout(1.1);
			setChance(chance);
			
			if (isLow == false) {
				changeCondition();
			}
        } else if (counterHigh > counterMax && getChance() == initialChance) {
			console.clear();
			console.log(counterHigh);
			counterLow = counterHigh = 0;
	  
		  	setBet(initialBet * coeff);
		  	//setPayout(1.1);
			setChance(chance);
			
			if (isLow == true) {
				changeCondition();
			}
	  } else {
            console.clear();
            console.log(roll);
			console.log('Counter Low = ' + counterLow);
			console.log('Counter High = ' + counterHigh);
        }
	});
}, speed * 4);
