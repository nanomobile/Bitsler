var initialBet = 0.00000001 * 1; // Initial bet value. Change it to what fits the best

var speed = 10;

var balanceMin = 0;
var balanceMax = 8000000;

var chance = 1;
var counterMax = 1700;
var initialCoeff = 1;
var coeff = 1;
var multiplier = 1;
var counterLow = 0;
var counterHigh = 0;

var chance2 = 49.50;
var counterMax2 = 23;
var initialCoeff2 = 1;
var coeff2 = 1;
var multiplier2 = 2;
var counterLow2 = 0;
var counterHigh2 = 0;

var chance3 = 33;
var counterMax3 = 31;
var initialCoeff3 = 1;
var coeff3 = 1;
var multiplier3 = 2;
var counterLow3 = 0;
var counterHigh3 = 0;

var isLow = true;

var initialChance = 98;

var betLimit = 256;

var winMax = 1;
var win = 0;

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

	if (getBet() > betLimit) {
		setBet(initialBet);
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
			win++;
			
			setBet(initialBet);

			if (win >= winMax) {
				setChance(initialChance);
			}
		} else if (getProfit() < 0 && getChance() == chance) {
			setBet(getBet() * multiplier);	
		}

		if (getProfit() > 0 && getChance() == chance2) {
			win++;
			
			setBet(initialBet);

			if (win >= winMax) {
				setChance(initialChance);
			}
		} else if (getProfit() < 0 && getChance() == chance2) {
			setBet(getBet() * multiplier2);	
		}

		if (getProfit() > 0 && getChance() == chance3) {
			win++;
			
			setBet(initialBet);

			if (win >= winMax) {
				setChance(initialChance);
			}
		} else if (getProfit() < 0 && getChance() == chance3) {
			setBet(getBet() * multiplier3);	
		}
		
		var roll = getRoll();
    
        if (getChance() == initialChance) {
			if (getProfit() < 0 && getBet() == initialBet) {
				setBet(initialBet * initialCoeff);
			} else {
				setBet(initialBet);
			}

            if (roll >= chance) {
                counterLow++;
            } else {
                counterLow = 0;
			}
			
			if (roll < 100 - chance) {
				counterHigh++;
			} else {
				counterHigh = 0;
			}

			if (roll >= chance2) {
                counterLow2++;
            } else {
                counterLow2 = 0;
			}
			
			if (roll < 100 - chance2) {
				counterHigh2++;
			} else {
				counterHigh2 = 0;
			}

			if (roll >= chance3) {
                counterLow3++;
            } else {
                counterLow3 = 0;
			}
			
			if (roll < 100 - chance3) {
				counterHigh3++;
			} else {
				counterHigh3 = 0;
			}
        }
    
        if (counterLow > counterMax && getChance() == initialChance) {
			win = 0;

      		console.clear();
      		console.log(counterLow);
			counterLow = counterHigh = counterLow2 = counterHigh2 = counterLow3 = counterHigh3 = 0;
	    
	    	setBet(initialBet * coeff);
		    //setPayout(1.1);
			setChance(chance);
			
			if (isLow == false) {
				changeCondition();
			}

			// stop();
			// return;
        } else if (counterHigh > counterMax && getChance() == initialChance) {
			win = 0;

			console.clear();
			console.log(counterHigh);
			counterLow = counterHigh = counterLow2 = counterHigh2 = counterLow3 = counterHigh3 = 0;
	  
		  	setBet(initialBet * coeff);
		  	//setPayout(1.1);
			setChance(chance);
			
			if (isLow == true) {
				changeCondition();
			}

			// stop();
			// return;
	  	} if (counterLow2 > counterMax2 && getChance() == initialChance) {
			win = 0;

      		console.clear();
      		console.log(counterLow2);
			counterLow = counterHigh = counterLow2 = counterHigh2 = counterLow3 = counterHigh3 = 0;
	    
	    	setBet(initialBet * coeff2);
		    //setPayout(1.1);
			setChance(chance2);
			
			if (isLow == false) {
				changeCondition();
			}

			// stop();
			// return;
        } else if (counterHigh2 > counterMax2 && getChance() == initialChance) {
			win = 0;

			console.clear();
			console.log(counterHigh2);
			counterLow = counterHigh = counterLow2 = counterHigh2 = counterLow3 = counterHigh3 = 0;
	  
		  	setBet(initialBet * coeff2);
		  	//setPayout(1.1);
			setChance(chance2);
			
			if (isLow == true) {
				changeCondition();
			}

			// stop();
			// return;
	  	} if (counterLow3 > counterMax3 && getChance() == initialChance) {
			win = 0;

      		console.clear();
      		console.log(counterLow3);
			counterLow = counterHigh = counterLow2 = counterHigh2 = counterLow3 = counterHigh3 = 0;
	    
	    	setBet(initialBet * coeff3);
		    //setPayout(1.1);
			setChance(chance3);
			
			if (isLow == false) {
				changeCondition();
			}

			// stop();
			// return;
        } else if (counterHigh3 > counterMax3 && getChance() == initialChance) {
			win = 0;

			console.clear();
			console.log(counterHigh3);
			counterLow = counterHigh = counterLow2 = counterHigh2 = counterLow3 = counterHigh3 = 0;
	  
		  	setBet(initialBet * coeff3);
		  	//setPayout(1.1);
			setChance(chance3);
			
			if (isLow == true) {
				changeCondition();
			}

			// stop();
			// return;
	  	} else {
            console.clear();
            console.log(roll);
			console.log('Counter Low = ' + counterLow);
			console.log('Counter High = ' + counterHigh);
			console.log('Counter Low 2 = ' + counterLow2);
			console.log('Counter High 2 = ' + counterHigh2);
			console.log('Counter Low 3 = ' + counterLow3);
			console.log('Counter High 3 = ' + counterHigh3);
        }
	});
}, speed * 2);
