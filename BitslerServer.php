BITSLER.com

________________________________________________________________________________________________________________________________________________________________________________________

http://www.writephponline.com/
________________________________________________________________________________________________________________________________________________________________________________________

$serverSeed = "0afd4037f301eac6d6357841da2302b329141141f06c688368c2ce72cdee735e70e99d0d648b3871840de57ca944e9b7b3f85b4649b9ce1b8f893726f1e21d0d";
$clientSeed = "9d686b0cf9b563434ddb54eec963db13db9a8357";

for ($i=0; $i<=100; $i++) {
  $nonce = $i;
  $seed = $serverSeed.'-'.$clientSeed.'-'.$nonce;
  do {
            $seed = sha1($seed);
            $lucky = hexdec(substr($seed,0,8));
  } while ($lucky > 4294960000);
  
  $luckyNumber = ($lucky % 10000) / 100;
  
  if ($luckyNumber < 0)
            $luckyNumber = -$luckyNumber;
  
  
  echo $luckyNumber . "<br>";
}

________________________________________________________________________________________________________________________________________________________________________________________

$serverSeed = "24ea163253b83ec69c6b81354a2e2d1e063c74790d528d21f510e721b1a7673f90baf1f00200b3edcdd5e607a0af7557ebe620e2ef0a8281e8da67f6ab4e6fc7";
$clientSeed = "4fb00e5845ff6784c8eca567da1014251154fd10";

for ($i=5516; $i>=5456; $i--) {
  $nonce = $i;
  $seed = $serverSeed.'-'.$clientSeed.'-'.$nonce;
  do {
            $seed = sha1($seed);
            $lucky = hexdec(substr($seed,0,8));
  } while ($lucky > 4294960000);
  
  $luckyNumber = ($lucky % 10000) / 100;
  
  if ($luckyNumber < 0)
            $luckyNumber = -$luckyNumber;
  
  
  echo $luckyNumber . "<br>";
}

________________________________________________________________________________________________________________________________________________________________________________________

$serverSeed = "94a05fdba519938559bec882e7ac0dbc5608913bfe4caee22ca0a77904f6bb225792e3dda9c46217f91b01890ec0addc6bf4ed316de167f9675066b11ba3cdd1";
$clientSeed = "bf491610aab96d6e3b9f3320a97d28942b481c93";

echo "Hash of Server Seed = " . hash("sha512", $serverSeed) . "<br>_____________________________________________________________________________________________<br>";

for ($i=1000; $i>=0; $i--) {
  echo $i . "<br>";
  $nonce = $i;
  $seed = $serverSeed.'-'.$clientSeed.'-'.$nonce;
  do {
            $seed = sha1($seed);
            $lucky = hexdec(substr($seed,0,8));
            echo "NOT FILTERED LUCKY = " . $lucky . "<br>";
  } while ($lucky > 4294960000);
  
  $luckyNumber = ($lucky % 10000) / 100;
  
  if ($luckyNumber < 0)
            $luckyNumber = -$luckyNumber;
  
  echo "Seed (fulstr) = " . $seed . "<br>";
  echo "Seed (substr) = " . substr($seed, 0, 8) . "<br>";
  echo "HexDec = " . $lucky = hexdec(substr($seed, 0, 8)) . "<br>";
  
  $luckyNumber = ($lucky % 10000) / 100;
      
  if ($luckyNumber < 0)
          $luckyNumber = -$luckyNumber;
  
  echo "Lucky = " . $luckyNumber . "<br>_____________________________________________________________________________________________<br>";
  
  //echo $luckyNumber . "<br>";  
}
________________________________________________________________________________________________________________________________________________________________________________________

play = function() {
	if (game_in_progress == true) {
		$("#btn-bet-dice, #btn-bet-start-pilot-dice, #btn-bet-start-fast-dice").button("reset");
		return false;
	}

	RequestAbortCount = 0;
	game_in_progress = true;

	if (autobet_mode == false) {
		var amount = $("#amount").val();
		var condition = $("#condition-input").val();
		var game = $("#game-input").val();
	}
	else {
		var amount = auto_amount;
		var condition = auto_condition;
		var game = auto_game;
	}

	amount = round_float(amount, devise_decimal);

	var profit = parseFloat($("#profit").val());
	var balance = parseFloat($("#balance-"+devise).val());
	var error = false;
	var error_value = "";
	var error_title = "";
	var error_info = "";

	if (profit > profit_max) {
		error_title = "Maximum profit exceeded";
		error_info = "Maximum profit: "+number_format(profit_max, devise_decimal);
		error_value = "Maximum profit exceeded - Maximum profit: "+number_format(profit_max, devise_decimal);
		error = true;
	}

	if (amount > balance) {
		error_title = "Bet amount";
		error_info = "Maximum bet: "+number_format(balance, devise_decimal);
		error_value = "Bet amount - Maximum bet: "+number_format(balance, devise_decimal);
		error = true;
	}
	else if (amount > bet_max) {
		error_title = "Bet amount";
		error_info = "Maximum bet: "+number_format(bet_max, devise_decimal);
		error_value = "Bet amount - Maximum bet: "+number_format(bet_max, devise_decimal);
		error = true;
	}
	else if (amount < bet_min) {
		error_title = "Bet amount";
		error_info = "Minimum bet: "+number_format(bet_min, devise_decimal);
		error_value = "Bet amount - Minimum bet: "+number_format(bet_min, devise_decimal);
		error = true;
	}

	if (error == true) {
		game_in_progress = false;
		$("#btn-bet-dice, #btn-bet-start-pilot-dice, #btn-bet-start-fast-dice").button("reset");

		if (autobet_mode == true) {
			if (number_bet_done >= 1) {
				$("#modal-stop-autobet-numbers").html(number_bet_done);
				$("#modal-stop-autobet-value").html(error_value);
				$("#modal-stop-autobet-reason").modal("show");
			}
			else {
				showErrorNotification(error_title, error_info);
			}

			stop_pilot_mode();
		}
		else {
			showErrorNotification(error_title, error_info);
		}

		return;
	}

	var time1 = (new Date()).getTime();
	$.ajax({
		type: "POST",
		url: "/api/bet",
		data: {
			access_token		:		access_token,
			username			:		user_username,
			type						:		"dice",
			amount				:		amount,
			condition				:		condition,
			game					:		game,
			devise					:		devise
		},
		success: function(text) {
			var val = JSON.parse(text);
			if (val.return.success == 'true') {
				bet_nb_errors = 0;

				var username = val.return.username;
				var id = val.return.id;
				var type = val.return.type;
				var devise = val.return.devise;
				var ts = val.return.ts;
				var time = val.return.time;
				var winning_chance = val.return.winning_chance;
				var roll_number = val.return.roll_number;
				var amount_return = val.return.amount_return;
				var new_balance = val.return.new_balance;
				var show = val.return.show;
				var amount = val.return.amount;
				var condition = val.return.condition;
				var game = val.return.game;
				var payout = val.return.payout;

				$("#won-bet span").html(amount_return);
				$("#won-bet span").removeClass("text-danger text-success");
				if (amount_return >= 0)	{
					$("#won-bet span").addClass("text-success");
					$("#won-bet span").html("+"+number_format(round_float(amount_return, 8), 8));
				}
				else {
					$("#won-bet span").addClass("text-danger");
					$("#won-bet span").html(number_format(round_float(amount_return, 8), 8));
				}
				show_result_bet();

				var balance_amount = parseFloat($("#balance-"+devise).val());
				balance_amount += parseFloat(amount_return);
				$("#balance-"+devise).val(round_float(balance_amount, 12));

				if (amount_return >= 0)
					$(".balance-"+devise+"-html").addClass("result-bet-win");
				else
					$(".balance-"+devise+"-html").addClass("result-bet-lose");

				$(".balance-"+devise+"-html").html(round_float(balance_amount, 8));

				if (amount_return >= 0)
					setTimeout(function() {	$(".balance-"+devise+"-html").removeClass("result-bet-win");	}, 350);
				else
					setTimeout(function() {	$(".balance-"+devise+"-html").removeClass("result-bet-lose");	}, 350);

				addBetHistory("my-bets", type, id, username, time, amount, devise, winning_chance, roll_number, amount_return, condition, game, payout);

				var notifications = val.return.notifications;
				for (var prop in notifications) {
					if (notifications[prop].name == "rcvJackpotDice")
						rcvJackpotDice(notifications[prop]);
					else {
						rcvnotificationbet(notifications[prop]);
					}
				}

				var time2 = (new Date()).getTime();
				var delay = time2-time1;

				if (autobet_mode == false) {
					if (devise == "btc")
						var base_speed = 0.00001000;
					else if (devise == "ltc")
						var base_speed = 0.001;
					else if (devise == "doge")
						var base_speed = 10;

					if (amount < base_speed)
						var time_by_bet = 500;
					else
						var time_by_bet = 100;

					if (delay < time_by_bet)
						time_by_bet = time_by_bet-delay;
					else
						time_by_bet = 0;

					setTimeout(function() {
						$("#btn-bet-dice, #btn-bet-start-pilot-dice, #btn-bet-start-fast-dice").button("reset");
					}, time_by_bet);

					// setTimeout(function() {
					//$("#btn-bet-dice, #btn-bet-start-pilot-dice, #btn-bet-start-fast-dice").button("reset");
					// }, time_by_bet);
				}
				else {
					number_bet_done++;

					if (unlimited_bet == false) {
						number_rolls--;
						$("#limit-rolls-input").val(number_rolls);

						var pourcBarre = ((number_rolls_total-number_rolls)/number_rolls_total)*100;
						$("#progress-bar-pilot-mode div").css("width", pourcBarre+"%");
					}

					if (amount_return >= 0) {
						auto_stats_won++;
					}
					else {
						auto_stats_lost++;
					}

					auto_stats_lucky = ((((parseInt(auto_stats_won)/parseInt(number_bet_done))*100)/parseFloat(winning_chance))*100).toFixed(2);

					auto_stats_wagered = parseFloat(auto_stats_wagered)+parseFloat(amount);
					auto_stats_profit = parseFloat(auto_stats_profit)+parseFloat(amount_return);

					if (on_win == "id-bet-win" && amount_return >= 0) {
						auto_amount = parseFloat(auto_amount)+parseFloat(auto_amount*(pourc_on_win/100));
					}
					else if (amount_return >= 0) {
						auto_amount = auto_amount_var;
					}

					if (on_lose == "id-bet-lose" && amount_return < 0) {
						auto_amount = parseFloat(auto_amount)+parseFloat(auto_amount*(pourc_on_lose/100));
					}
					else if (amount_return < 0) {
						auto_amount = auto_amount_var;
					}

					update_stats_auto();

					if ((number_bet_done < number_rolls_total) || unlimited_bet == true) {
						var speed_bet_val = $("#speed-bet").val();
						var speed = (100-speed_bet_val);

						if (devise == "btc")
							var base_speed = 0.00000100;
						else if (devise == "ltc")
							var base_speed = 0.0002;
						else if (devise == "doge")
							var base_speed = 2;

						if (auto_amount >= (base_speed*50)) {
							var time_by_bet = speed*20;
						}
						else if (auto_amount >= (base_speed*10)) {
							var time_by_bet = speed*10;
						}
						else if (auto_amount >= base_speed) {
							var time_by_bet = speed*5;
						}
						else {
							var time_by_bet = speed*1;
						}

						if (autobet_stop == false) {
							if (delay < time_by_bet)
								time_by_bet = time_by_bet-delay;
							else
								time_by_bet = 0;

							setTimeout(function() {
								if(auto_amount > 0.00001000){
//									if(!confirm(round_float(auto_amount, devise_decimal))){
//										stop_pilot_mode();
//										//     auto_amount = 500;
//										return false;
//									}

									auto_amount_o = auto_amount
//									if(auto_amount > 0.00000400)
//										auto_amount = 0.00000400;

									auto_amount = prompt(round_float(auto_amount_o, devise_decimal)+'?', round_float(auto_amount, devise_decimal));
									if(auto_amount == ""){
										stop_pilot_mode();
										return false;
									}

									auto_amount = parseFloat(auto_amount);
								}
								
								if((auto_amount - 0.00001) > auto_stats_profit){
//									if(!confirm('amount='+round_float(auto_amount, devise_decimal)+' > profit='+round_float(auto_stats_profit, devise_decimal))){
//										stop_pilot_mode();
//										//     auto_amount = 500;
//										return false;
//									}
									
									
									auto_amount = prompt('amount='+round_float(auto_amount, devise_decimal)+' > profit='+round_float(auto_stats_profit, devise_decimal), round_float(auto_amount, devise_decimal));
									if(auto_amount == ""){
										stop_pilot_mode();
										return false;
									}

									auto_amount = parseFloat(auto_amount);
								}
								

								play();
							}, time_by_bet);
						}
						else {
							stop_pilot_mode();
						}
					}
					else {
						stop_pilot_mode();
					}
				}

				if (val.return.event == true) {
					socket.emit("event", {});
				}
			}
			else {
				if (val.return.type != "abort") {
					if (autobet_mode == false) {
						showErrorNotification(val.return.value, val.return.info);
						$("#btn-bet-dice, #btn-bet-start-pilot-dice, #btn-bet-start-fast-dice").button("reset");
					}
					else {
						if (number_bet_done >= 1) {
							$("#modal-stop-autobet-numbers").html(number_bet_done);
							$("#modal-stop-autobet-value").html(val.return.value);
							$("#modal-stop-autobet-reason").modal("show");
						}
						else {
							showErrorNotification(val.return.value, val.return.info);
						}

						stop_pilot_mode();
					}
				}
				else {
					if (bet_nb_errors >= 2) {
						bet_nb_errors = 0;
						if (autobet_mode == false) {
							showErrorNotification(val.return.value, val.return.info);
							$("#btn-bet-dice, #btn-bet-start-pilot-dice, #btn-bet-start-fast-dice").button("reset");
						}
						else {
							if (number_bet_done >= 1) {
								$("#modal-stop-autobet-numbers").html(number_bet_done);
								$("#modal-stop-autobet-value").html(val.return.value);
								$("#modal-stop-autobet-reason").modal("show");
							}
							else {
								showErrorNotification(val.return.value, val.return.info);
							}

							stop_pilot_mode();
						}

					}
					else {
						bet_nb_errors++;
						setTimeout(function() {	play();	}, 1000);
					}
				}

			}

			game_in_progress = false;

		}
	});

}
________________________________________________________________________________________________________________________________________________________________________________________

<?php

ini_set('max_execution_time', 0);
set_time_limit(0);

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$serverSeed = "bfd4994b480aeedf08ec2f2a82a3791ea79b45b5affb81d5ef89dee98640269948346edf5f8a354665a4a1a765024e67d0237bea809b34100759ba761f598cb4";
$clientSeed = "8f7c06e9e48849f38b0a592b5ea5824a5424e331";

$serverSeed = "f808d5cbc0771fa5f615e811375cbb5d7c234bde2fed050301d7690d266bcd9d699c7ffadef9cea12ce1e7305816ae42f6acad6ee46f3212e7f14d69204dc845";
$clientSeed = "fba068da0f035a4dfe24ff7841ab52beea8619eb";

//echo "Hash of Server Seed = " . hash("sha512", $serverSeed) . "<br>_____________________________________________________________________________________________<br>";

$low = 0;
$high = 0;

$maxLossesInRow = 0;
$lossesInRow = 0;

for ($i=0; $i<=10000000; $i++) {
  //echo $i . "<br>";
  $nonce = $i;
  $seed = $serverSeed.'-'.$clientSeed.'-'.$nonce;
  do {
            $seed = sha1($seed);
            $lucky = hexdec(substr($seed,0,8));
            //echo "NOT FILTERED LUCKY = " . $lucky . "<br>";
  } while ($lucky > 4294960000);
  
  $luckyNumber = ($lucky % 10000) / 100;
  
  if ($luckyNumber < 0)
            $luckyNumber = -$luckyNumber;
  
  //echo "Seed (fulstr) = " . $seed . "<br>";
  //echo "Seed (substr) = " . substr($seed, 0, 8) . "<br>";
  //echo "HexDec = " . $lucky = hexdec(substr($seed, 0, 8)) . "<br>";
  
  $luckyNumber = ($lucky % 10000) / 100;
      
  if ($luckyNumber < 0)
          $luckyNumber = -$luckyNumber;
  
  //echo "Lucky = " . $luckyNumber . "<br>_____________________________________________________________________________________________<br>";
  
  //echo $luckyNumber . "<br>";  
  
  if ($luckyNumber < 49.5) {
      $low++;   
      $lossesInRow++;
      if ($maxLossesInRow < $lossesInRow) {
          $maxLossesInRow = $lossesInRow; 
      }
  } else if ($luckyNumber > 50.49) {
      $high++;
      $lossesInRow = 0;
  } else {
      $lossesInRow = 0;
  }
}

echo "Low = " . $low . "<br>" . "High = " . $high . "<br>";
echo "Max Losses In Row = " . $maxLossesInRow . "<br>";
________________________________________________________________________________________________________________________________________________________________________________________
