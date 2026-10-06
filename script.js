// ===============================
// Coffee Vending Machine Simulator
// ===============================

// Coffee menu and recipes
const menu = {
    Espresso: {
        price: 40,
        water: 50,
        milk: 0,
        coffee: 10,
        sugar: 5
    },

    Cappuccino: {
        price: 60,
        water: 50,
        milk: 100,
        coffee: 10,
        sugar: 5
    },

    Latte: {
        price: 70,
        water: 40,
        milk: 150,
        coffee: 10,
        sugar: 5
    }
};

// Maximum ingredient capacity
const capacity = {
    water: 1000,
    milk: 1000,
    coffee: 200,
    sugar: 200
};

// Current ingredient quantities
let ingredients = {
    water: 1000,
    milk: 1000,
    coffee: 200,
    sugar: 200
};

// Current transaction
let selectedCoffee = null;
let insertedAmount = 0;


// =================================
// Select Coffee
// =================================
function selectCoffee(name) {

    // Prevent changing coffee during an active transaction
    if (insertedAmount > 0) {
        showMessage(
            "Please complete or cancel the current transaction first.",
            "error"
        );
        return;
    }

    selectedCoffee = name;

    const coffee = menu[name];

    // Remove selection from all cards
    document.querySelectorAll(".coffee-card").forEach(card => {
        card.classList.remove("selected");
    });

    // Highlight selected coffee
    document
        .getElementById(`card-${name}`)
        .classList.add("selected");

    // Update selected coffee information
    document.getElementById("selectedCoffee").textContent = name;
    document.getElementById("selectedPrice").textContent =
        `₹${coffee.price}`;

    showMessage(
        `${name} selected. Please enter ₹${coffee.price} or more.`,
        "info"
    );

    // Focus on money input
    document.getElementById("moneyInput").focus();
}


// =================================
// Insert Money
// =================================
function addMoney() {

    // Check if coffee is selected
    if (!selectedCoffee) {
        showMessage(
            "Please select a coffee before inserting money.",
            "error"
        );
        return;
    }

    const input = document.getElementById("moneyInput");
    const amount = parseFloat(input.value);

    // Validate amount
    if (Number.isNaN(amount) || amount <= 0) {
        showMessage(
            "Please enter a valid positive amount.",
            "error"
        );

        input.focus();
        return;
    }

    // Add money
    insertedAmount += amount;

    // Clear input
    input.value = "";

    const price = menu[selectedCoffee].price;

    // Insufficient payment
    if (insertedAmount < price) {

        const remaining = price - insertedAmount;

        showMessage(
            `₹${insertedAmount.toFixed(2)} inserted. ` +
            `₹${remaining.toFixed(2)} more required.`,
            "info"
        );

        return;
    }

    // Calculate change
    const change = insertedAmount - price;

    // Prepare coffee
    prepareCoffee(selectedCoffee, change);
}


// =================================
// Prepare Coffee
// =================================
function prepareCoffee(name, change) {

    const recipe = menu[name];

    // Automatically refill ingredients if required
    autoRefill("water", recipe.water);
    autoRefill("milk", recipe.milk);
    autoRefill("coffee", recipe.coffee);
    autoRefill("sugar", recipe.sugar);

    // Deduct ingredients
    ingredients.water -= recipe.water;
    ingredients.milk -= recipe.milk;
    ingredients.coffee -= recipe.coffee;
    ingredients.sugar -= recipe.sugar;

    // Update inventory display
    updateIngredients();

    // Create success message
    let message = `
        <strong>☕ ${name} is ready!</strong><br>
        Price: ₹${recipe.price.toFixed(2)}<br>
        Amount inserted: ₹${insertedAmount.toFixed(2)}
    `;

    // Display change or exact payment
    if (change > 0) {

        message += `
            <br>
            Change returned:
            <strong>₹${change.toFixed(2)}</strong>
        `;

    } else {

        message += `
            <br>
            Exact payment received.
        `;
    }

    // Show success message
    showMessage(message, "success");

    // Reset transaction
    insertedAmount = 0;
    selectedCoffee = null;

    document.getElementById("selectedCoffee").textContent =
        "No coffee selected";

    document.getElementById("selectedPrice").textContent = "₹0";

    // Remove coffee card selection
    document.querySelectorAll(".coffee-card").forEach(card => {
        card.classList.remove("selected");
    });
}


// =================================
// Automatic Ingredient Refill
// =================================
function autoRefill(ingredient, requiredAmount) {

    // No refill required if recipe doesn't use ingredient
    if (requiredAmount === 0) {
        return;
    }

    // Refill if available quantity is insufficient
    if (ingredients[ingredient] < requiredAmount) {

        ingredients[ingredient] =
            capacity[ingredient];
    }
}


// =================================
// Cancel Transaction
// =================================
function cancelTransaction() {

    // Check if there is an active transaction
    if (!selectedCoffee && insertedAmount === 0) {

        showMessage(
            "There is no active transaction to cancel.",
            "error"
        );

        return;
    }

    // Store refund amount
    const refund = insertedAmount;

    // Reset transaction
    insertedAmount = 0;
    selectedCoffee = null;

    // Reset display
    document.getElementById("selectedCoffee").textContent =
        "No coffee selected";

    document.getElementById("selectedPrice").textContent =
        "₹0";

    document.getElementById("moneyInput").value = "";

    // Remove card selection
    document.querySelectorAll(".coffee-card").forEach(card => {
        card.classList.remove("selected");
    });

    // Display refund
    showMessage(
        `Transaction cancelled successfully. ` +
        `Refund amount: <strong>₹${refund.toFixed(2)}</strong>`,
        "info"
    );
}


// =================================
// Update Ingredient Display
// =================================
function updateIngredients() {

    // Display ingredient quantities
    const values = {

        water: `${ingredients.water} ml`,

        milk: `${ingredients.milk} ml`,

        coffee: `${ingredients.coffee} g`,

        sugar: `${ingredients.sugar} g`
    };

    // Update text values
    Object.keys(values).forEach(name => {

        document.getElementById(name).textContent =
            values[name];
    });

    // Update progress bars
    Object.keys(capacity).forEach(name => {

        const percentage = Math.max(
            0,
            Math.min(
                100,
                (ingredients[name] /
                    capacity[name]) * 100
            )
        );

        document.getElementById(`${name}Bar`).style.width =
            `${percentage}%`;
    });
}


// =================================
// Display Message
// =================================
function showMessage(message, type) {

    const box = document.getElementById("message");

    box.innerHTML = message;

    box.className = `message ${type}`;
}


// =================================
// Press Enter to Insert Money
// =================================
function handleEnter(event) {

    if (event.key === "Enter") {
        addMoney();
    }
}


// =================================
// Reset Machine
// =================================
function resetMachine() {

    // Restore all ingredients to full capacity
    ingredients = {
        water: capacity.water,
        milk: capacity.milk,
        coffee: capacity.coffee,
        sugar: capacity.sugar
    };

    // Reset transaction
    selectedCoffee = null;
    insertedAmount = 0;

    // Reset UI
    document.getElementById("selectedCoffee").textContent =
        "No coffee selected";

    document.getElementById("selectedPrice").textContent =
        "₹0";

    document.getElementById("moneyInput").value = "";

    // Remove card selection
    document.querySelectorAll(".coffee-card").forEach(card => {
        card.classList.remove("selected");
    });

    // Update ingredient display
    updateIngredients();

    // Show reset message
    showMessage(
        "Machine reset successfully. Ready for a new order.",
        "success"
    );
}


// =================================
// Initialize Machine
// =================================
updateIngredients();
