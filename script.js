let money = 0;
let lemonadePower = 1;
let upgradeCost = 10;

function sellLemonade() {
    money += lemonadePower;

    document.getElementById("message").innerHTML =
        "🍋 Someone bought your lemonade!";

    updateScreen();
}


function buyUpgrade() {

    if (money >= upgradeCost) {

        money -= upgradeCost;
        lemonadePower += 1;

        upgradeCost *= 2;

        document.getElementById("message").innerHTML =
            "✨ Your recipe improved!";

    } else {

        document.getElementById("message").innerHTML =
            "❌ You need more money!";

    }

    updateScreen();
}


function updateScreen() {

    document.getElementById("money").innerHTML = money;

    document.getElementById("power").innerHTML =
        lemonadePower;

    document.getElementById("upgradeCost").innerHTML =
        upgradeCost;
}
