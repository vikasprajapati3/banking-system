import { error } from "node:console";
import { Account } from "../models/Account";
import { Transaction, TransactionType } from "../models/Transaction";

export class Bank {

    //A/c array to store acounts
    private accounts: Account[] = [];

    // Array tp store transactions
    private transactions: Transaction[] = []

    //A/c number start from 10000001 
    private nextAccountNumber: number = 10000001;
    private nextTransactionNumber: number = 1;

    constructor() {
        console.log("Banking system initialized.");
    }

    //Method for creating new account
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

        this.accounts.push(account);   // add in accounts array
        this.nextAccountNumber++;      //increment for new accounts

        return account;
    }

    //Method for transactions
    private recordTransaction(accountNumber: number, type: TransactionType, amount: number): void {

        const transaction: Transaction = {
            transactionId: `TXN${String(this.nextTransactionNumber).padStart(4, "0")}`,  //eg."TXN0001"
            accountNumber: accountNumber,
            type: type,
            amount: amount,
            date: new Date()
        };

        this.transactions.push(transaction);
        this.nextTransactionNumber++;
    }

    //Method for depositing money
    deposit(accountNumber: number, amount: number): Account {
        const account = this.accounts.find(
            acc => acc.accountNumber == accountNumber);

        //validations 
        if (!account) {
            throw new Error("Account not found");
        }

        if (amount <= 0) {
            throw new Error("Deposit amount must be greater than zero");
        }

        account.balance += amount;   //increase balance

        //record transaction in Transaction array
        this.recordTransaction(accountNumber, TransactionType.DEPOSIT, amount);

        return account;
    }

    //Method for withdrawal of money
    withdraw(accountNumber: number, amount: number): Account {
        const account = this.accounts.find(acc => acc.accountNumber == accountNumber);

        if (!account) {
            throw new Error("Account not found");
        }

        if (amount <= 0) {
            throw new Error("Deposit amount must be greater than zero");
        }

        //if balace is less than ammount show error
        if (account.balance < amount) {
            throw new Error("Insufficient Balance");
        }

        account.balance -= amount;       // Decrease balace

        //add record in transaction
        this.recordTransaction(accountNumber, TransactionType.WITHDRAWAL, amount);

        return account;
    }

    //Method for TRANSFER
    transfer(fromAccountNumber: number, toAccountNumber: number, amount: number): void {

        // storing account object in variable
        const fromAccount = this.accounts.find(
            acc => acc.accountNumber == fromAccountNumber);

        const toAccount = this.accounts.find(
            acc => acc.accountNumber == toAccountNumber);

        // Validations
        if (!fromAccount || !toAccount) {
            throw new Error("Accounts not found");
        }

        if (fromAccountNumber === toAccountNumber) {
            throw new Error("Cannot transfer to the same account");
        }

        if (amount <= 0) {
            throw new Error("Transfer amount must be greater than zero");
        }

        if (fromAccount.balance < amount) {
            throw new Error("Insufficient balance!");
        }

        // TRANSFER PROCESS
        fromAccount.balance -= amount;
        toAccount.balance += amount;

        //independent object for transaction record of transfer
        const transaction: Transaction = {
            transactionId: `TXN${String(this.nextTransactionNumber).padStart(4, "0")}`,
            accountNumber: fromAccountNumber,
            toAccountNumber: toAccountNumber,
            type: TransactionType.TRANSFER,
            amount: amount,
            date: new Date()
        };

        this.transactions.push(transaction);
        this.nextTransactionNumber++;
    }

    getBalance(accountNumber: number): number {

        const account = this.accounts.find(
            acc => acc.accountNumber == accountNumber);

        //validation
        if (!account) {
            throw new Error("Account not found");
        }

        return account.balance;
    }

}