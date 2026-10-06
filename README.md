# coffee_vending_machine_simulator
coffee_vending_machine_simulator
# ☕ BrewMate — Coffee Vending Machine Simulator

A modern, interactive **Coffee Vending Machine Simulator** developed using **HTML, CSS, and JavaScript**.

The project simulates the working of a real coffee vending machine, including coffee selection, payment processing, insufficient/excess payment handling, change calculation, ingredient management, automatic refilling, transaction cancellation, and machine reset.

---

## 📌 Project Overview

**BrewMate** is a web-based simulation of a coffee vending machine.

The user can:

- Select a coffee.
- Enter money.
- Add money in multiple installments.
- Get notified if the payment is insufficient.
- Complete the transaction with exact payment.
- Receive change when excess money is inserted.
- Automatically refill ingredients when their quantity is insufficient.
- Deduct ingredients after successful preparation.
- Cancel a transaction and receive a refund.
- Reset the machine to its original state.

The project is designed with a modern, responsive interface suitable for both desktop and mobile devices.

---

## ✨ Features

### ☕ Coffee Selection

The machine provides three coffee options:

| Coffee     | Price |
| ---------- | ----: |
| Espresso   |   ₹40 |
| Cappuccino |   ₹60 |
| Latte      |   ₹70 |

Users can select any available coffee from the menu.

---

### 💰 Payment Processing

The simulator supports different payment situations.

#### Insufficient Payment

If the inserted amount is less than the coffee price, the machine displays the remaining amount.

Example:

```text
Coffee Price: ₹60
Inserted: ₹40

₹20 more required.
```

The user can insert additional money to complete the transaction.

---

### ✅ Exact Payment

If the inserted amount exactly matches the coffee price, the coffee is prepared without returning any change.

Example:

```text
Coffee Price: ₹40
Inserted: ₹40

Exact payment received.
Coffee is ready!
```

---

### 💵 Excess Payment

If the user inserts more money than required, the machine automatically calculates and displays the change.

Example:

```text
Coffee Price: ₹40
Inserted: ₹100

Change Returned: ₹60
```

---

## 🧂 Ingredient Management

The machine maintains quantities of four ingredients:

- 💧 Water
- 🥛 Milk
- ☕ Coffee Powder
- 🍬 Sugar

The inventory is represented using JavaScript variables and is updated after every successful transaction.

### Initial Capacity

| Ingredient    | Capacity |
| ------------- | -------: |
| Water         |  1000 ml |
| Milk          |  1000 ml |
| Coffee Powder |    200 g |
| Sugar         |    200 g |

---

## 🔄 Automatic Ingredient Refill

Before preparing a coffee, the machine checks whether enough ingredients are available.

If an ingredient is below the required quantity, the machine automatically refills that ingredient to its predefined maximum capacity.

For example:

```text
Available Water: 30 ml
Required Water: 50 ml

↓ Automatic Refill

Water: 1000 ml
```

The required amount is then deducted for preparing the coffee.

---

## 📋 Coffee Recipes

Each coffee requires a specific quantity of ingredients.

| Coffee     | Water |   Milk | Coffee Powder | Sugar |
| ---------- | ----: | -----: | ------------: | ----: |
| Espresso   | 50 ml |   0 ml |          10 g |   5 g |
| Cappuccino | 50 ml | 100 ml |          10 g |   5 g |
| Latte      | 40 ml | 150 ml |          10 g |   5 g |

---

## ❌ Transaction Cancellation

The user can cancel an active transaction before the coffee is prepared.

When a transaction is cancelled:

1. The selected coffee is cleared.
2. The inserted amount is calculated.
3. The inserted amount is refunded.
4. The transaction is reset.
5. The user can start a new transaction.

Example:

```text
Inserted Amount: ₹50

Transaction cancelled.

Refund Amount: ₹50
```

---

## 🔁 Machine Reset

The **Reset Machine** option restores the machine to its original state.

It resets:

- Ingredient quantities
- Selected coffee
- Inserted money
- Coffee selection
- Payment information

After resetting:

```text
Machine reset successfully.
Ready for a new order.
```

---

# 🛠️ Technologies Used

### HTML5

Used to create the structure of the vending machine interface.

### CSS3

Used for:

- Modern UI design
- Responsive layout
- Coffee cards
- Buttons
- Progress bars
- Animations
- Dark coffee-themed interface

### JavaScript

Used to implement the complete vending machine logic, including:

- Coffee selection
- Payment processing
- Change calculation
- Ingredient management
- Automatic refill
- Transaction cancellation
- Machine reset
- Input validation

---

# 📁 Project Structure

```text
coffee-vending-machine-simulator/
│
├── index.html       # Main webpage structure
├── style.css        # Styling and responsive UI
├── script.js        # Vending machine logic
└── README.md        # Project documentation
```

---

# 🚀 How to Run the Project

## Method 1 — Open Directly

1. Download or clone the project.
2. Make sure all three files are in the same folder.
3. Open `index.html` in any modern web browser.

That's it!

---

## Method 2 — Using VS Code

1. Open the project folder in **Visual Studio Code**.
2. Make sure the following files are present:

```text
index.html
style.css
script.js
```

3. Open `index.html`.
4. Right-click the file.
5. Select **Open with Live Server**.

The application will open in your browser.

---

# 🧠 Working Algorithm

```text
START
  │
  ▼
Display Coffee Menu
  │
  ▼
User Selects Coffee
  │
  ▼
Enter Money
  │
  ▼
Validate Input
  │
  ├── Invalid ──► Display Error
  │
  ▼
Compare Inserted Amount With Price
  │
  ├── Amount < Price
  │       │
  │       ▼
  │   Display Remaining Amount
  │       │
  │       ▼
  │   Accept More Money
  │
  ▼
Amount >= Price
  │
  ▼
Calculate Change
  │
  ▼
Check Ingredients
  │
  ├── Insufficient
  │       │
  │       ▼
  │   Automatically Refill
  │
  ▼
Deduct Required Ingredients
  │
  ▼
Prepare Coffee
  │
  ▼
Return Change
  │
  ▼
Display Success Message
  │
  ▼
Reset Transaction
  │
  ▼
Return to Main Menu
  │
  ▼
END
```

---

### Ingredient Capacity Object

```javascript
const capacity = {
    water: 1000,
    milk: 1000,
    coffee: 200,
    sugar: 200
};
```

---

### Current Ingredients Object

```javascript
let ingredients = {
    water: 1000,
    milk: 1000,
    coffee: 200,
    sugar: 200
};
```

Objects make it easy to access and update individual ingredients and coffee recipes.

---

# ⚙️ Important JavaScript Functions

## `selectCoffee()`

Selects a coffee and displays its price.

```javascript
selectCoffee("Espresso");
```

---

## `addMoney()`

Accepts the amount entered by the user and checks whether the payment is sufficient.

It handles:

- Valid amount
- Invalid amount
- Insufficient payment
- Exact payment
- Excess payment

---

## `prepareCoffee()`

Prepares the selected coffee after successful payment.

It:

1. Checks ingredients.
2. Refills ingredients if necessary.
3. Deducts ingredients.
4. Calculates change.
5. Displays the success message.
6. Resets the transaction.

---

## `autoRefill()`

Automatically refills an ingredient when the available quantity is less than the required quantity.

---

## `cancelTransaction()`

Cancels the current transaction and refunds the inserted money.

---

## `updateIngredients()`

Updates the ingredient quantities and progress bars displayed on the interface.

---

## `showMessage()`

Displays information, success, or error messages to the user.

---

## `resetMachine()`

Restores the machine to its initial state.

---

# 🧪 Test Cases

| Test Case | Input                        | Expected Result             |
| --------- | ---------------------------- | --------------------------- |
| 1         | Select Espresso              | Espresso selected           |
| 2         | Insert ₹20                   | ₹20 more required           |
| 3         | Insert another ₹20           | Espresso prepared           |
| 4         | Select Cappuccino + ₹60      | Cappuccino prepared         |
| 5         | Select Latte + ₹100          | Latte prepared + ₹30 change |
| 6         | Enter ₹0                     | Invalid amount message      |
| 7         | Enter negative amount        | Invalid amount message      |
| 8         | Enter letters                | Invalid amount message      |
| 9         | Cancel after inserting money | Money refunded              |
| 10        | Cancel without transaction   | Error message               |
| 11        | Ingredient below requirement | Automatic refill            |
| 12        | Click Reset Machine          | Machine restored            |

---

# 🔐 Input Validation

The system validates user input before processing payment.

The following inputs are rejected:

```text
0
Negative values
Empty input
Non-numeric values
```

Example:

```text
Input: -20

Output:
Please enter a valid positive amount.
```

---

# 🎯 Example Transaction

### Step 1 — Select Coffee

```text
Coffee: Cappuccino
Price: ₹60
```

### Step 2 — Insert Money

```text
Inserted: ₹40
```

The machine displays:

```text
₹20 more required.
```

### Step 3 — Insert Remaining Money

```text
Inserted: ₹20
Total: ₹60
```

### Step 4 — Ingredient Check

The machine checks:

```text
Water
Milk
Coffee Powder
Sugar
```

If any ingredient is insufficient, it is automatically refilled.

### Step 5 — Coffee Preparation

The required ingredients are deducted.

### Step 6 — Transaction Complete

```text
☕ Cappuccino is ready!

Price: ₹60
Amount inserted: ₹60
Exact payment received.
```

---

# 📱 Responsive Design

The interface is designed to work across different screen sizes.

Supported devices include:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📱 Tablet

The layout automatically adjusts according to the screen width.

---

# 🎨 UI Design

The project uses a modern coffee-themed interface featuring:

- Dark coffee color palette
- Glass-style cards
- Interactive coffee selection
- Ingredient progress bars
- Responsive layout
- Hover effects
- Status indicator
- Success and error notifications
- Modern typography
- Clean spacing and layout

---

# 🧩 Project Logic

The overall logic can be summarized as:

```text
Coffee Selection
       ↓
Payment
       ↓
Payment Validation
       ↓
Enough Money?
   ↙          ↘
 No            Yes
 ↓              ↓
Ask for       Calculate
More Money     Change
                ↓
        Check Ingredients
                ↓
        Auto Refill if Needed
                ↓
        Deduct Ingredients
                ↓
        Prepare Coffee
                ↓
        Return Change
                ↓
        Reset Transaction
```

---

# 🔮 Future Enhancements

The project can be further improved by adding:

- 💳 Card/UPI payment simulation
- 🧾 Digital receipt generation
- 📊 Daily sales statistics
- 🗃️ Transaction history
- 🔐 Admin mode
- ⚙️ Custom coffee recipes
- 🛠️ Manual inventory management
- 🔔 Low-ingredient warnings
- 🎵 Coffee preparation sound effects
- 🌐 Backend/database integration
- 📱 Progressive Web App support

---

# 🎓 Learning Outcomes

Through this project, the following concepts were implemented:

- HTML structure and semantic elements
- CSS layouts and responsive design
- JavaScript variables and objects
- Functions
- Conditional statements
- Loops
- DOM manipulation
- Event handling
- Input validation
- State management
- Basic data structures
- Real-world problem simulation
- User interface design

---

# 👨‍💻 Project Information

**Project:** Coffee Vending Machine Simulator
**Project Name:** BrewMate
**Technologies:** HTML5, CSS3, JavaScript
**Interface:** Responsive Web Application

---

# 📜 License

This project is created for **educational and academic purposes**.

You are free to modify and improve the project for learning purposes.

---

## ⭐ If You Like This Project

If you find this project useful, consider giving the repository a ⭐ on GitHub!
