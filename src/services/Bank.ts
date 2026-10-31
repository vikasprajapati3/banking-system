import { Account } from "../models/Account";

export class Bank {

    private accounts: Account[] = [];
    private nextAccountNumber: number = 1001;

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

}