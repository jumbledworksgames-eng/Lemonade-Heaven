// ============================
// Lemonade Heaven v0.2
// Script
// ============================


// ----------------------------
// GAME DATA
// ----------------------------

let game = {

    money: 0,

    clickIncome: 1,

    passiveIncome: 0,

    multiplier: 1,


    upgradesBought: 0,


    achievements: {},


    settings: {

        music: true,

        sfx: true,

        musicVolume: 0.7,

        sfxVolume: 0.8

    },


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



// ----------------------------
// AUDIO
// ----------------------------


const music =
document.getElementById("music");


const sellSound =
document.getElementById("sellSound");


const buySound =
document.getElementById("buySound");


const achievementSound =
document.getElementById("achievementSound");



function updateAudio(){

    music.volume =
    game.settings.musicVolume;


    sellSound.volume =
    game.settings.sfxVolume;


    buySound.volume =
    game.settings.sfxVolume;


    achievementSound.volume =
    game.settings.sfxVolume;


    if(game.settings.music){

        music.play().catch(()=>{});

    }

    else{

        music.pause();

    }

}



function playSFX(sound){

    if(game.settings.sfx){

        sound.currentTime = 0;

        sound.play();

    }

}





// ----------------------------
// SAVE / LOAD
// ----------------------------


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

        game =
        JSON.parse(save);

        updateAudio();

        showGame();

        updateUI();

    }

    else{

        alert(
        "No saved game found!"
        );

    }

}





// ----------------------------
// NEW GAME
// ----------------------------


function newGame(){

    localStorage.removeItem(
    "lemonadeHeavenSave"
    );


    location.reload();

}






// ----------------------------
// SCREEN CHANGES
// ----------------------------


function showGame(){

    document
    .getElementById("menu")
    .classList.add("hidden");


    document
    .getElementById("game")
    .classList.remove("hidden");

}





// ----------------------------
// SELL LEMONADE
// ----------------------------


function sellLemonade(){

    game.money +=
    game.clickIncome *
    game.multiplier;


    playSFX(sellSound);


    checkAchievements();


    updateUI();

    saveGame();

}






// ----------------------------
// UPGRADES
// ----------------------------


function buyUpgrade(type){


    let upgrade =
    game.upgrades[type];


    if(game.money < upgrade.cost){

        setStatus(
        "❌ Not enough money!"
        );

        return;

    }



    game.money -=
    upgrade.cost;


    game.upgradesBought++;



    switch(type){


        case "recipe":

            game.clickIncome++;

        break;



        case "employee":

            game.passiveIncome += 0.1;

        break;



        case "shop":

            game.multiplier *= 1.1;

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


    playSFX(buySound);


    setStatus(
    "✨ Upgrade purchased!"
    );


    checkAchievements();


    updateUI();

    saveGame();

}





// ----------------------------
// ACHIEVEMENTS
// ----------------------------


const achievements = {


    firstCustomer:{

        name:"🍋 First Customer",

        text:"Earn $100",

        condition:()=>game.money>=100

    },


    rookie:{

        name:"💵 Lemonade Rookie",

        text:"Earn $1,000",

        condition:()=>game.money>=1000

    },


    business:{

        name:"💰 Lemonade Business",

        text:"Earn $10,000",

        condition:()=>game.money>=10000

    },


    tycoon:{

        name:"🏦 Lemonade Tycoon",

        text:"Earn $100,000",

        condition:()=>game.money>=100000

    },


    empire:{

        name:"🌎 Lemonade Empire",

        text:"Earn $1,000,000",

        condition:()=>game.money>=1000000

    },


    spender:{

        name:"🛒 Big Spender",

        text:"Buy 100 upgrades",

        condition:()=>game.upgradesBought>=100

    },


    global:{

        name:"🌎 Going Global",

        text:"Buy Global Expansion",

        condition:()=>game.upgrades.global.cost > 1000000

    }

};




function checkAchievements(){


    for(let id in achievements){


        if(!game.achievements[id]){


            if(
            achievements[id]
            .condition()
            ){


                unlockAchievement(id);


            }

        }

    }

}





function unlockAchievement(id){


    game.achievements[id]=true;


    playSFX(
    achievementSound
    );


    let popup =
    document.getElementById(
    "achievementPopup"
    );


    popup.innerHTML =

    "🏆 " +
    achievements[id].name
    +
    "<br>"
    +
    achievements[id].text;



    popup.classList.remove(
    "hidden"
    );



    setTimeout(()=>{

        popup.classList.add(
        "hidden"
        );

    },3000);



}






// ----------------------------
// SETTINGS
// ----------------------------


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
.getElementById("musicToggle")
.onclick = ()=>{


game.settings.music =
!game.settings.music;


updateAudio();

saveGame();

};



document
.getElementById("sfxToggle")
.onclick = ()=>{


game.settings.sfx =
!game.settings.sfx;


saveGame();

};





document
.getElementById("musicVolume")
.oninput = e=>{


game.settings.musicVolume =
e.target.value / 100;


updateAudio();

saveGame();

};




document
.getElementById("sfxVolume")
.oninput = e=>{


game.settings.sfxVolume =
e.target.value / 100;


saveGame();

};





// ----------------------------
// ACHIEVEMENT MENU
// ----------------------------


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





// ----------------------------
// BUTTONS
// ----------------------------


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


button.onclick=()=>{

buyUpgrade(
button.dataset.upgrade
);

};


});




// ----------------------------
// UI UPDATE
// ----------------------------


function updateUI(){


document
.getElementById("money")
.textContent =
Math.floor(game.money);



document
.getElementById("clickIncome")
.textContent =
(game.clickIncome *
game.multiplier)
.toFixed(1);



document
.getElementById("passiveIncome")
.textContent =
(game.passiveIncome *
game.multiplier)
.toFixed(1);



for(let key in game.upgrades){


document
.getElementById(key+"Cost")
.textContent =
"$"+game.upgrades[key].cost;


}


}





function setStatus(text){

document
.getElementById("status")
.textContent =
text;

}





// ----------------------------
// PASSIVE MONEY
// ----------------------------


setInterval(()=>{


game.money +=
game.passiveIncome *
game.multiplier;



checkAchievements();


updateUI();


saveGame();



},1000);
