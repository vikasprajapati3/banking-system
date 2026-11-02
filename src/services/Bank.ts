import { error } from "node:console";
import { Account } from "../models/Account";
import { Transaction, TransactionType } from "../models/Transaction";

export class Bank {

    private accounts: Account[] = [];
    private transactions: Transaction[] = []

    private nextAccountNumber: number = 10000001;
    private nextTransactionNumber: number = 1;

    constructor() {
        console.log("Banking system initialized.");
    }

    createAccount(customerName: string): Account {
        if (customerName.trim() === "") {
            throw new Error("Name is required.");
        }

        const account: Account = {
            accountNumber: this.nextAccountNumber,
            customerName: customerName,
            balance: 0,
            createdAt: new Date()
        };

        this.accounts.push(account);
        this.nextAccountNumber++;

        return account;
    }

    private recordTransaction(accountNumber: number, type: TransactionType, amount: number): void {

        const transaction: Transaction = {
            transactionId: `TXN${String(this.nextTransactionNumber).padStart(4, "0")}`,
            accountNumber: accountNumber,
            type: type,
            amount: amount,
            date: new Date()
        };

        this.transactions.push(transaction);
        this.nextTransactionNumber++;
    }

    deposit(accountNumber: number, amount: number): Account {
        const account = this.accounts.find(acc => acc.accountNumber == accountNumber);

        if (!account) {
            throw new Error("Account not found");
        }

        if (amount <= 0) {
            throw new Error("Deposit amount must be greater than zero");
        }

        account.balance += amount;

        this.recordTransaction(accountNumber, TransactionType.DEPOSIT, amount);

        return account;
    }

    withdraw(accountNumber: number, amount: number): Account {
        const account = this.accounts.find(acc => acc.accountNumber == accountNumber);

        if (!account) {
            throw new Error("Account not found");
        }

        if (amount <= 0) {
            throw new Error("Deposit amount must be greater than zero");
        }

        if (account.balance < amount) {
            throw new Error("Insufficient Balance");
        }

        account.balance -= amount;

        this.recordTransaction(accountNumber, TransactionType.WITHDRAWAL, amount);

        return account;
    }


}