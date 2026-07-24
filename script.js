let money = 0;

let clickPower = 1;
let income = 0;
let multiplier = 1;


let upgrades = {

recipe:{
price:10
},

employee:{
price:50
},

shop:{
price:250
},

factory:{
price:1000
},

delivery:{
price:5000
},

ads:{
price:15000
},

farm:{
price:50000
},

ai:{
price:250000
},

global:{
price:1000000
}

};



function sell(){

money += clickPower * multiplier;

update();

}



function buy(item){

let upgrade = upgrades[item];


if(money >= upgrade.price){


money -= upgrade.price;



switch(item){


case "recipe":
clickPower += 1;
break;


case "employee":
income += 0.1;
break;


case "shop":
multiplier += 0.1;
break;


case "factory":
income += 10;
break;


case "delivery":
income += 5;
break;


case "ads":
multiplier += 0.25;
break;


case "farm":
income += 50;
break;


case "ai":
income += 250;
break;


case "global":
multiplier *= 2;
break;


}



upgrade.price *= 2;


document.getElementById("message").innerHTML =
"✨ Upgrade purchased!";


}

else{


document.getElementById("message").innerHTML =
"❌ Not enough money!";


}


update();

}




function update(){


document.getElementById("money").innerHTML =
Math.floor(money);



document.getElementById("click").innerHTML =
Math.floor(clickPower * multiplier);



document.getElementById("second").innerHTML =
Math.floor(income * multiplier);



for(let item in upgrades){

document.getElementById(item+"-price").innerHTML =
upgrades[item].price;

}


}



setInterval(()=>{

money += income * multiplier;

update();

},1000);
