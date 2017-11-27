var stoper = 0.000001;

var profit = parseFloat($('#auto_stats_profit').text());

$('#history-my-bets-dice').unbind();

$('#history-my-bets-dice').bind("DOMSubtreeModified", function(event) {
  if ($(event.currentTarget)) {
    if (stoper < profit) {
      $('#btn-bet-stop-pilot-dice').trigger('click');
    }
    
    profit = parseFloat($('#auto_stats_profit').text());
  }
 });
