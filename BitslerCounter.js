var initialBet = 0.00000001 * 1;

var speed = 50;

var counterLow = 0;
var counterLowMax = 2000;

var counterHigh = 0;
var counterHighMax = 5000;

var chance = 0.01;

setBet(initialBet);
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
  console.clear();
  
  console.log(counterLow);
  console.log(counterHigh);

	if (getBalance() <= 0) return;
	
	if (initialBet == 0) return;
	
	$("#btn-bet-dice").click();
}

function stop() {
	initialBet = 0;	
}

setInterval(function() {
	if (getBalance() <= 0) return;
	
	if (initialBet == 0) return;
	
  if (getRoll() >= chance) {
    counterLow++;
  }
  
  if (getRoll() <= 100.0 - chance - 0.01) {
    counterHigh++;
  }
  
  if (counterLow >= counterLowMax || counterHigh >= counterHighMax) {
    stop();
    return;
  }
  
	setTimeout(function(){
		roll();
	},speed);
}, speed * 4);
