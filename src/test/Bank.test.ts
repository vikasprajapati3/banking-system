import { describe, test, expect, beforeEach } from "vitest";
import { Bank } from "../services/Bank";

describe("Bank Management System", () => {

    let bank: Bank;

    beforeEach(() => {
        bank = new Bank();
    });

    // Account Creation
    test("should create an account", () => {
        const account = bank.createAccount("Rahul Sharma");

        expect(account.customerName).toBe("Rahul Sharma");
        expect(String(account.accountNumber)).toHaveLength(8);
        expect(account.balance).toBe(0);
    });

    // Deposit
    test("should deposit money", () => {
        const account = bank.createAccount("Rahul");

        bank.deposit(account.accountNumber, 5000);

        expect(bank.getBalance(account.accountNumber)).toBe(5000);
    });

    // Withdrawal
    test("should withdraw money", () => {
        const account = bank.createAccount("Rahul");

        bank.deposit(account.accountNumber, 5000);
        bank.withdraw(account.accountNumber, 2000);

        expect(bank.getBalance(account.accountNumber)).toBe(3000);
    });

    // Insufficient Balance
    test("should reject withdrawal with insufficient balance", () => {
        const account = bank.createAccount("Rahul");

        expect(() => {
            bank.withdraw(account.accountNumber, 5000);
        }).toThrow();
    });

    // Invalid Deposit
    test("should reject invalid deposit amount", () => {
        const account = bank.createAccount("Rahul");

        expect(() => {
            bank.deposit(account.accountNumber, -500);
        }).toThrow();
    });

    // Empty Customer Name
    test("should reject empty customer name", () => {
        expect(() => {
            bank.createAccount("");
        }).toThrow();
    });

    // Zero Deposit
    test("should reject zero deposit", () => {
        const account = bank.createAccount("Rahul");

        expect(() => {
            bank.deposit(account.accountNumber, 0);
        }).toThrow();
    });

    // Negative Withdrawal
    test("should reject negative withdrawal", () => {
        const account = bank.createAccount("Rahul");

        bank.deposit(account.accountNumber, 5000);

        expect(() => {
            bank.withdraw(account.accountNumber, -1000);
        }).toThrow();
    });

    // Invalid Account Number
    test("should reject invalid account number", () => {
        expect(() => {
            bank.deposit(99999999, 1000);
        }).toThrow();
    });

    // Fund Transfer
    test("should transfer money between accounts", () => {
        const account1 = bank.createAccount("Rahul");
        const account2 = bank.createAccount("Amit");

        bank.deposit(account1.accountNumber, 10000);

        bank.transfer(
            account1.accountNumber,
            account2.accountNumber,
            3000
        );

        expect(bank.getBalance(account1.accountNumber)).toBe(7000);
        expect(bank.getBalance(account2.accountNumber)).toBe(3000);
    });

    // Insufficient Balance Transfer
    test("should reject transfer with insufficient balance", () => {
        const account1 = bank.createAccount("Rahul");
        const account2 = bank.createAccount("Amit");

        expect(() => {
            bank.transfer(
                account1.accountNumber,
                account2.accountNumber,
                5000
            );
        }).toThrow();
    });

    // Transfer to Same Account
    test("should reject transfer to same account", () => {
        const account = bank.createAccount("Rahul");

        bank.deposit(account.accountNumber, 5000);

        expect(() => {
            bank.transfer(
                account.accountNumber,
                account.accountNumber,
                1000
            );
        }).toThrow();
    });

    // Multiple Deposits
    test("should calculate balance after multiple deposits", () => {
        const account = bank.createAccount("Rahul");

        bank.deposit(account.accountNumber, 1000);
        bank.deposit(account.accountNumber, 2000);
        bank.deposit(account.accountNumber, 3000);

        expect(bank.getBalance(account.accountNumber)).toBe(6000);
    });

    // Transaction History
    test("should record transaction history", () => {
        const account = bank.createAccount("Rahul");

        bank.deposit(account.accountNumber, 5000);

        const history = bank.getTransactionHistory(account.accountNumber);

        expect(history.length).toBeGreaterThan(0);
    });

});
