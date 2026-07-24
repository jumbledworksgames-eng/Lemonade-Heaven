let money = 0;

let clickPower = 1;

let income = 0;

let multiplier = 1;


let prices = {

recipe:10,
employee:50,
shop:250,
factory:1000,
delivery:5000,
advertising:15000,
farm:50000,
ai:250000,
global:1000000

};



function newGame(){

money = 0;

clickPower = 1;

income = 0;

multiplier = 1;


prices = {

recipe:10,
employee:50,
shop:250,
factory:1000,
delivery:5000,
advertising:15000,
farm:50000,
ai:250000,
global:1000000

};


saveGame();


openGame();

}




function openGame(){

document.getElementById("startScreen").style.display="none";

document.getElementById("gameScreen").style.display="block";

update();

}




function sellLemonade(){

money += clickPower * multiplier;

update();

saveGame();

}




function buy(item){


if(money >= prices[item]){


money -= prices[item];



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


case "advertising":
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



prices[item] *= 2;


document.getElementById("message").innerHTML =
"✨ Upgrade purchased!";


saveGame();

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


document.getElementById("clickPower").innerHTML =
Math.floor(clickPower * multiplier);


document.getElementById("income").innerHTML =
Math.floor(income * multiplier);



for(let item in prices){

document.getElementById(item).innerHTML =
prices[item];

}


}





function saveGame(){

let save = {

money,
clickPower,
income,
multiplier,
prices

};


localStorage.setItem(
"lemonadeSave",
JSON.stringify(save)
);

}




function continueGame(){


let save = localStorage.getItem(
"lemonadeSave"
);


if(save){


let data = JSON.parse(save);


money = data.money;

clickPower = data.clickPower;

income = data.income;

multiplier = data.multiplier;

prices = data.prices;


openGame();


}

else{


alert("No saved game found!");

}


}





function resetGame(){

localStorage.removeItem(
"lemonadeSave"
);


location.reload();

}




// Passive income

setInterval(()=>{


money += income * multiplier;


update();

saveGame();


},1000);
