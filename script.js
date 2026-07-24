let money = 0;
let lemonadePower = 1;
let upgradeCost = 10;

function sellLemonade() {
    money += lemonadePower;
    updateScreen();
}

function buyUpgrade() {
    if (money >= upgradeCost) {
        money -= upgradeCost;
        lemonadePower += 1;
        upgradeCost *= 2;
        updateScreen();
    } else {
        alert("You need more money!");
    }
}

function updateScreen() {
    document.getElementById("money").innerHTML = money;
    document.getElementById("power").innerHTML = lemonadePower;
}
