let money = 0;
let power = 1;
let upgradeCost = 10;


function sellLemonade() {

    money += power;

    document.getElementById("message").innerHTML =
        "🍋 Lemonade sold!";

    update();

}


function buyUpgrade() {

    if (money >= upgradeCost) {

        money -= upgradeCost;

        power += 1;

        upgradeCost *= 2;


        document.getElementById("message").innerHTML =
            "✨ Recipe upgraded!";

    } else {

        document.getElementById("message").innerHTML =
            "❌ Not enough money!";

    }


    update();

}



function update() {

    document.getElementById("money").innerHTML = money;

    document.getElementById("power").innerHTML = power;

    document.getElementById("upgradeCost").innerHTML = upgradeCost;

}
