// =========================
// Lemonade Heaven v0.1
// =========================

// ---------- Game Data ----------

let game = {
    money: 0,

    clickIncome: 1,
    passiveIncome: 0,
    multiplier: 1,

    upgrades: {

        recipe: {
            cost: 10
        },

        employee: {
            cost: 50
        },

        shop: {
            cost: 250
        },

        factory: {
            cost: 1000
        },

        delivery: {
            cost: 5000
        },

        advertising: {
            cost: 15000
        },

        farm: {
            cost: 50000
        },

        ai: {
            cost: 250000
        },

        global: {
            cost: 1000000
        }

    }

};


// ---------- Save ----------

function saveGame() {

    localStorage.setItem(
        "lemonadeHeavenSave",
        JSON.stringify(game)
    );

}


// ---------- Load ----------

function loadGame() {

    let save =
        localStorage.getItem("lemonadeHeavenSave");

    if (save) {

        game = JSON.parse(save);

        startGame();

    }
    else {

        alert("No save found!");

    }

}


// ---------- New Game ----------

function newGame() {

    localStorage.removeItem("lemonadeHeavenSave");

    game = {

        money: 0,

        clickIncome: 1,

        passiveIncome: 0,

        multiplier: 1,

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

    startGame();

}


// ---------- Open Game ----------

function startGame() {

    document.getElementById("menu").classList.add("hidden");

    document.getElementById("game").classList.remove("hidden");

    updateUI();

}


// ---------- Sell Lemonade ----------

function sellLemonade() {

    game.money +=
        game.clickIncome * game.multiplier;

    updateUI();

    saveGame();

}


// ---------- Buy Upgrade ----------

function buyUpgrade(type) {

    let upgrade = game.upgrades[type];

    if (game.money < upgrade.cost) {

        setStatus("❌ Not enough money!");

        return;

    }

    game.money -= upgrade.cost;

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
        Math.floor(upgrade.cost * 1.5);

    setStatus("✨ Upgrade purchased!");

    updateUI();

    saveGame();

}


// ---------- Update UI ----------

function updateUI() {

    document.getElementById("money").textContent =
        game.money.toFixed(1);

    document.getElementById("clickIncome").textContent =
        (game.clickIncome * game.multiplier).toFixed(1);

    document.getElementById("passiveIncome").textContent =
        (game.passiveIncome * game.multiplier).toFixed(1);


    document.getElementById("recipeCost").textContent =
        "$" + game.upgrades.recipe.cost;

    document.getElementById("employeeCost").textContent =
        "$" + game.upgrades.employee.cost;

    document.getElementById("shopCost").textContent =
        "$" + game.upgrades.shop.cost;

    document.getElementById("factoryCost").textContent =
        "$" + game.upgrades.factory.cost;

    document.getElementById("deliveryCost").textContent =
        "$" + game.upgrades.delivery.cost;

    document.getElementById("advertisingCost").textContent =
        "$" + game.upgrades.advertising.cost;

    document.getElementById("farmCost").textContent =
        "$" + game.upgrades.farm.cost;

    document.getElementById("aiCost").textContent =
        "$" + game.upgrades.ai.cost;

    document.getElementById("globalCost").textContent =
        "$" + game.upgrades.global.cost;

}


// ---------- Status ----------

function setStatus(text){

    document.getElementById("status").textContent = text;

}


// ---------- Passive Income ----------

setInterval(function(){

    game.money +=
        game.passiveIncome * game.multiplier;

    updateUI();

    saveGame();

},1000);


// ---------- Buttons ----------

document
.getElementById("newGameButton")
.addEventListener("click", newGame);


document
.getElementById("continueButton")
.addEventListener("click", loadGame);


document
.getElementById("lemonButton")
.addEventListener("click", sellLemonade);


document
.querySelectorAll(".upgrade")
.forEach(button => {

    button.addEventListener("click", () => {

        buyUpgrade(button.dataset.upgrade);

    });

});
