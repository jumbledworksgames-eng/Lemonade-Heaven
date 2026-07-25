// ============================
// Lemonade Heaven v0.2
// Clean Script
// ============================


let game = {

    money: 0,

    clickIncome: 1,

    passiveIncome: 0,

    multiplier: 1,


    upgradesBought: 0,


    achievements: {},


    upgrades: {

        recipe:{cost:10},

        employee:{cost:50},

        shop:{cost:250},

        factory:{cost:1000},

        delivery:{cost:5000},

        advertising:{cost:15000},

        farm:{cost:50000},

        ai:{cost:250000},

        global:{cost:1000000}

    }

};




// ============================
// SAVE / LOAD
// ============================


function saveGame(){

    localStorage.setItem(
        "lemonadeHeavenSave",
        JSON.stringify(game)
    );

}



function loadGame(){

    let save =
    localStorage.getItem(
        "lemonadeHeavenSave"
    );


    if(save){

        game = JSON.parse(save);

        showGame();

        updateUI();

        checkAchievements();

    }

    else{

        alert("No saved game found!");

    }

}





// ============================
// NEW GAME
// ============================


function newGame(){

    localStorage.removeItem(
        "lemonadeHeavenSave"
    );


    game = {

        money:0,

        clickIncome:1,

        passiveIncome:0,

        multiplier:1,

        upgradesBought:0,

        achievements:{},


        upgrades:{

            recipe:{cost:10},
            employee:{cost:50},
            shop:{cost:250},
            factory:{cost:1000},
            delivery:{cost:5000},
            advertising:{cost:15000},
            farm:{cost:50000},
            ai:{cost:250000},
            global:{cost:1000000}

        }

    };


    saveGame();

    showGame();

    updateUI();

}





// ============================
// SCREEN SWITCHING
// ============================


function showGame(){

    document
    .getElementById("menu")
    .classList.add("hidden");


    document
    .getElementById("game")
    .classList.remove("hidden");

}







// ============================
// SELL LEMONADE
// ============================


function sellLemonade(){


    game.money +=
    game.clickIncome *
    game.multiplier;


    updateUI();

    checkAchievements();

    saveGame();


}







// ============================
// UPGRADES
// ============================


function buyUpgrade(type){


    let upgrade =
    game.upgrades[type];



    if(game.money < upgrade.cost){


        setStatus(
        "❌ Not enough money!"
        );


        return;

    }



    game.money -= upgrade.cost;


    game.upgradesBought++;



    switch(type){


        case "recipe":

            game.clickIncome += 1;

        break;



        case "employee":

            game.passiveIncome += 0.1;

        break;



        case "shop":

            game.multiplier *= 1.10;

        break;



        case "factory":

            game.passiveIncome += 10;

        break;



        case "delivery":

            game.passiveIncome += 5;

        break;



        case "advertising":

            game.multiplier *= 1.25;

        break;



        case "farm":

            game.passiveIncome += 50;

        break;



        case "ai":

            game.passiveIncome += 250;

        break;



        case "global":

            game.multiplier *= 2;

        break;


    }



    upgrade.cost =
    Math.floor(
        upgrade.cost * 1.5
    );


    setStatus(
    "✨ Upgrade purchased!"
    );


    updateUI();

    checkAchievements();

    saveGame();


}







// ============================
// ACHIEVEMENTS
// ============================


const achievements = {


    firstCustomer:{

        name:"🍋 First Customer",

        text:"Earn $100",

        condition:()=>game.money >= 100

    },


    rookie:{

        name:"💵 Lemonade Rookie",

        text:"Earn $1,000",

        condition:()=>game.money >= 1000

    },


    business:{

        name:"💰 Lemonade Business",

        text:"Earn $10,000",

        condition:()=>game.money >= 10000

    },


    tycoon:{

        name:"🏦 Lemonade Tycoon",

        text:"Earn $100,000",

        condition:()=>game.money >= 100000

    },


    empire:{

        name:"🌎 Lemonade Empire",

        text:"Earn $1,000,000",

        condition:()=>game.money >= 1000000

    },


    spender:{

        name:"🛒 Big Spender",

        text:"Buy 100 upgrades",

        condition:()=>game.upgradesBought >= 100

    },


    global:{

        name:"🌎 Going Global",

        text:"Buy Global Expansion",

        condition:()=>game.multiplier >= 2

    }


};






function checkAchievements(){


    for(let id in achievements){


        if(
            !game.achievements[id] &&
            achievements[id].condition()
        ){


            unlockAchievement(id);


        }


    }


}





function unlockAchievement(id){


    game.achievements[id] = true;


    let popup =
    document.getElementById(
    "achievementPopup"
    );


    popup.innerHTML =

    "🏆 "
    +
    achievements[id].name
    +
    "<br>"
    +
    achievements[id].text;



    popup.classList.remove(
    "hidden"
    );



    updateAchievementMenu();



    setTimeout(()=>{

        popup.classList.add(
        "hidden"
        );

    },3000);



}







function updateAchievementMenu(){


    for(let id in achievements){


        let element =
        document.getElementById(id);



        if(game.achievements[id]){


            element.innerHTML =

            "🏆 "
            +
            achievements[id].name
            +
            "<br>"
            +
            achievements[id].text;



            element.classList.add(
            "unlocked"
            );


        }


    }


}






// ============================
// UI
// ============================


function updateUI(){


    document
    .getElementById("money")
    .textContent =
    Math.floor(game.money);



    document
    .getElementById("clickIncome")
    .textContent =
    (
    game.clickIncome *
    game.multiplier
    ).toFixed(1);



    document
    .getElementById("passiveIncome")
    .textContent =
    (
    game.passiveIncome *
    game.multiplier
    ).toFixed(1);




    for(let key in game.upgrades){


        document
        .getElementById(
            key + "Cost"
        )
        .textContent =
        "$" + game.upgrades[key].cost;


    }


    updateAchievementMenu();

}





function setStatus(text){

    document
    .getElementById("status")
    .textContent =
    text;

}







// ============================
// MENUS
// ============================


document
.getElementById("newGameButton")
.onclick =
newGame;



document
.getElementById("continueButton")
.onclick =
loadGame;



document
.getElementById("lemonButton")
.onclick =
sellLemonade;




document
.querySelectorAll(".upgrade")
.forEach(button=>{


    button.onclick = ()=>{

        buyUpgrade(
        button.dataset.upgrade
        );

    };


});





document
.getElementById("settingsButton")
.onclick = ()=>{

document
.getElementById("settingsPanel")
.classList.remove("hidden");

};




document
.getElementById("closeSettings")
.onclick = ()=>{

document
.getElementById("settingsPanel")
.classList.add("hidden");

};





document
.getElementById("achievementButton")
.onclick = ()=>{

document
.getElementById("achievementPanel")
.classList.remove("hidden");

};





document
.getElementById("closeAchievements")
.onclick = ()=>{

document
.getElementById("achievementPanel")
.classList.add("hidden");

};







// ============================
// PASSIVE INCOME
// ============================


setInterval(()=>{


    game.money +=
    game.passiveIncome *
    game.multiplier;


    checkAchievements();


    updateUI();


    saveGame();


},1000);
