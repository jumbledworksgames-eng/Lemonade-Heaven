// ======================
// Lemonade Heaven v0.1
// ======================

let game = {
    money: 0,
    clickIncome: 1,
    passiveIncome: 0,
    multiplier: 1,

    upgrades: {
        recipe: { cost: 10 },
        employee: { cost: 50 },
        shop: { cost: 250 },
        factory: { cost: 1000 },
        delivery: { cost: 5000 },
        advertising: { cost: 15000 },
        farm: { cost: 50000 },
        ai: { cost: 250000 },
        global: { cost: 1000000 }
    }
};

// ---------- Buttons ----------

document.getElementById("newGameButton").onclick = newGame;
document.getElementById("continueButton").onclick = continueGame;
document.getElementById("lemonButton").onclick = sellLemonade;

document.querySelectorAll(".upgrade").forEach(button => {
    button.onclick = () => buyUpgrade(button.dataset.upgrade);
});

// ---------- Menu ----------

function showGame() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
}

function newGame() {

    localStorage.removeItem("lemonadeHeavenSave");

    game = {
        money: 0,
        clickIncome: 1,
        passiveIncome: 0,
        multiplier: 1,

        upgrades: {
            recipe: { cost: 10 },
            employee: { cost: 50 },
            shop: { cost: 250 },
            factory: { cost: 1000 },
            delivery: { cost: 5000 },
            advertising: { cost: 15000 },
            farm: { cost: 50000 },
            ai: { cost: 250000 },
            global: { cost: 1000000 }
        }
    };

    saveGame();
    updateUI();
    showGame();
}

function continueGame() {

    const save = localStorage.getItem("lemonadeHeavenSave");

    if (!save) {
        alert("No saved game found.");
        return;
    }

    game = JSON.parse(save);

    updateUI();
    showGame();
}

// ---------- Save ----------

function saveGame() {
    localStorage.setItem(
        "lemonadeHeavenSave",
        JSON.stringify(game)
    );
}

// ---------- Clicking ----------

function sellLemonade() {

    game.money += game.clickIncome * game.multiplier;

    updateUI();
    saveGame();

}

// ---------- Upgrades ----------

function buyUpgrade(type) {

    const upgrade = game.upgrades[type];

    if (game.money < upgrade.cost) {
        document.getElementById("status").textContent =
            "❌ Not enough money!";
        return;
    }

    game.money -= upgrade.cost;

    switch(type){

        case "recipe":
            game.clickIncome++;
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

    upgrade.cost = Math.floor(upgrade.cost * 1.5);

    document.getElementById("status").textContent =
        "✨ Upgrade purchased!";

    updateUI();
    saveGame();
}

// ---------- UI ----------

function updateUI() {

    document.getElementById("money").textContent =
        game.money.toFixed(1);

    document.getElementById("clickIncome").textContent =
        (game.clickIncome * game.multiplier).toFixed(1);

    document.getElementById("passiveIncome").textContent =
        (game.passiveIncome * game.multiplier).toFixed(1);

    for (const key in game.upgrades) {
        document.getElementById(key + "Cost").textContent =
            "$" + game.upgrades[key].cost;
    }

}

// ---------- Passive Income ----------

setInterval(() => {

    game.money += game.passiveIncome * game.multiplier;

    updateUI();
    saveGame();

}, 1000);
