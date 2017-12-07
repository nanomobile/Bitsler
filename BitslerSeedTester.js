
var vet_acc=new Array(0,0,0,0,0,0,0,0,0,0);
var vet_seq=new Array(0,0,0,0,0,0,0,0,0,0);
var last_roll=-1,roll,pos,qnt_seq=1;
var cont=1;
var isLow = true;

function show_stats(){
 console.log("*------------*------------*");
 console.log("acumulado 0.00-49.99: "+ (vet_acc[0] + vet_acc[1] + vet_acc[2] + vet_acc[3] + vet_acc[4]).toString());
 console.log("acumulado 50.00-99.99: "+ (vet_acc[5] + vet_acc[6] + vet_acc[7] + vet_acc[8] + vet_acc[9]).toString());
 //console.log("acumulado 0.00-9.99: "+ vet_acc[0].toString());
 //console.log("acumulado 10.00-19.99: "+ vet_acc[1].toString());
 //console.log("acumulado 20.00-29.99: "+ vet_acc[2].toString());
 //console.log("acumulado 30.00-39.99: "+ vet_acc[3].toString());
 //console.log("acumulado 40.00-49.99: "+ vet_acc[4].toString());
 //console.log("acumulado 50.00-59.99: "+ vet_acc[5].toString());
 //console.log("acumulado 60.00-69.99: "+ vet_acc[6].toString());
 //console.log("acumulado 70.00-79.99: "+ vet_acc[7].toString());
 //console.log("acumulado 80.00-89.99: "+ vet_acc[8].toString());
 //console.log("acumulado 90.00-99.99: "+ vet_acc[9].toString());
 console.log("*------------*------------*");
 //console.log("sequencia 0.00-9.99: "+ vet_seq[0].toString());
 //console.log("sequencia 10.00-19.99: "+ vet_seq[1].toString());
 //console.log("sequencia 20.00-29.99: "+ vet_seq[2].toString());
 //console.log("sequencia 30.00-39.99: "+ vet_seq[3].toString());
 //console.log("sequencia 40.00-49.99: "+ vet_seq[4].toString());
 //console.log("sequencia 50.00-59.99: "+ vet_seq[5].toString());
 //console.log("sequencia 60.00-69.99: "+ vet_seq[6].toString());
 //console.log("sequencia 70.00-79.99: "+ vet_seq[7].toString());
 //console.log("sequencia 80.00-89.99: "+ vet_seq[8].toString());
 //console.log("sequencia 90.00-99.99: "+ vet_seq[9].toString());
 //console.log("*------------*------------*"); 
}

$('#btn-bet-start-pilot-dice').trigger('click');

$('#history-my-bets-dice').unbind();


$('#history-my-bets-dice').bind("DOMSubtreeModified",function(event){
if( $(event.currentTarget) ){	
	
	if (vet_acc[0] + vet_acc[1] + vet_acc[2] + vet_acc[3] + vet_acc[4] < vet_acc[5] + vet_acc[6] + vet_acc[7] + vet_acc[8] + vet_acc[9]) {
	    if (false == isLow) {
		    isLow = true;
		    roll_by_condition();
	    }
	} else {
	    if (true == isLow) {
		    isLow = false;
		    roll_by_condition();
	    }
	}
	
        if(cont%2==1){
		
	}
	else{
		roll=parseFloat($('#history-my-bets-dice tr')[0].children[6].innerHTML);
		if(Math.floor(last_roll/10)==Math.floor(roll/10)){
			qnt_seq=qnt_seq+1;
		}
		else{
			if(qnt_seq>vet_seq[pos]){
				vet_seq[pos]=qnt_seq;
			}
			qnt_seq=1;
		}
		pos=Math.floor(roll/10);
		if(vet_seq[pos]==0){
			vet_seq[pos]=1;
		}		
		vet_acc[pos]=vet_acc[pos]+1;
		console.clear();		
		show_stats();
		last_roll=roll;
        }
	cont=cont+1;
 }
});
