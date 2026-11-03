import readline from "readline";
import { Bank } from "./services/Bank";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const bank = new Bank();

// Method to display menu
function showMenu(): void {

    console.log("\n===== BANKING SYSTEM =====");
    console.log("1. Create Account");
    console.log("2. Deposit Money");
    console.log("3. Withdraw Money");
    console.log("4. Transfer Money");
    console.log("5. Check Balance");
    console.log("6. Transaction History");
    console.log("7. Exit");

    rl.question("\nEnter your choice: ", handleChoice);
}

// Handle user choice
function handleChoice(choice: string): void {

    switch (choice) {

        case "1":
            createAccount();
            break;

        case "2":
            depositMoney();
            break;

        case "3":
            withdrawMoney();
            break;

        case "4":
            transferMoney();
            break;

        case "5":
            checkBalance();
            break;

        case "6":
            showTransactionHistory();
            break;

        case "7":
            console.log("\n--Thank you for using Banking System!--\n");
            rl.close();
            return;

        default:
            console.log("Invalid choice!");
            showMenu();
    }
}

// Create account
function createAccount(): void {

    rl.question("\nEnter customer name: ", (name) => {

        try {
            const account = bank.createAccount(name);

            console.log("Account created successfully!");
            console.log(account);

        } catch (error) {
            console.log("Error:", error);
        }

        showMenu();
    });
}

// Deposit money
function depositMoney(): void {

    rl.question("\nEnter account number: ", (acc) => {

        rl.question("Enter amount: ", (amount) => {

            try {
                bank.deposit(Number(acc), Number(amount));
                console.log("Deposit successful!");

            } catch (error) {
                console.log("Error:", error);
            }

            showMenu();
        });
    });
}

// Withdraw money
function withdrawMoney(): void {

    rl.question("\nEnter account number: ", (acc) => {

        rl.question("Enter amount: ", (amount) => {

            try {
                bank.withdraw(Number(acc), Number(amount));
                console.log("Withdrawal successful!");

            } catch (error) {
                console.log("Error:", error);
            }

            showMenu();
        });
    });
}

// Transfer money
function transferMoney(): void {

    rl.question("\nEnter sender account: ", (sender) => {

        rl.question("Enter receiver account: ", (receiver) => {

            rl.question("Enter amount: ", (amount) => {

                try {
                    bank.transfer(Number(sender), Number(receiver), Number(amount));

                    console.log("Transfer successful!");

                } catch (error) {
                    console.log("Error:", error);
                }

                showMenu();
            });
        });
    });
}

// Check balance
function checkBalance(): void {

    rl.question("\nEnter account number: ", (acc) => {

        try {
            const balance = bank.getBalance(Number(acc));

            console.log("Account Balance:", balance);

        } catch (error) {
            console.log("Error:", error);
        }

        showMenu();
    });
}

// Transaction history
function showTransactionHistory(): void {

    rl.question("\nEnter account number: ", (acc) => {

        try {
            const transactions = bank.getTransactionHistory(Number(acc));

            console.log("Transaction History:");
            console.log(transactions);

        } catch (error) {
            console.log("Error:", error);
        }

        showMenu();
    });
}

// Start application
showMenu();
