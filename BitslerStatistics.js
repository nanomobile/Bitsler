var roll;

function getRoll() {
	return parseFloat($('#history-my-bets-dice tr').first().find('td:last').prev().text());
}

var chance = 1;
var counterMax = 100 * 2 * 4.5;
var counter = 0;

$('#history-my-bets-dice').unbind();

$('#history-my-bets-dice').bind("DOMSubtreeModified", function(event) {
  console.clear();
  
  if ($(event.currentTarget)) {
    roll = getRoll();
    
    if (roll >= chance) {
      		counter++;
    } else {
      		counter = 0;
    }
    
    if (counter > counterMax) {
      		console.clear();
      		console.log(counter);
      		$('#btn-bet-stop-pilot-dice').trigger('click');
    } else {
	    	console.clear();
	    	console.log(roll);
	    	console.log(counter / 2 - 0.5);
    }
  }
 });
