var stopMax = 0.0001;
var stopMin = -0.00001;

var profit = parseFloat($('#auto_stats_profit').text());

$('#history-my-bets-dice').unbind();

$('#history-my-bets-dice').bind("DOMSubtreeModified", function(event) {
  if ($(event.currentTarget)) {
    if (stopMax < profit || stopMin > profit) {
      $('#btn-bet-stop-pilot-dice').trigger('click');
    }
    
    profit = parseFloat($('#auto_stats_profit').text());
  }
 });
