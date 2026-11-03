import fs from "fs";
import path from "path";

import { Account } from "../models/Account";
import { Transaction } from "../models/Transaction";

const DATA_DIR = path.join(process.cwd(), "data");

const ACCOUNTS_FILE = path.join(DATA_DIR, "accounts.json");

const TRANSACTIONS_FILE = path.join(DATA_DIR, "transactions.json");

// Create data folder and JSON files if don't exist
function ensureDataFiles(): void {

    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(ACCOUNTS_FILE)) {
        fs.writeFileSync(ACCOUNTS_FILE, "[]");
    }

    if (!fs.existsSync(TRANSACTIONS_FILE)) {
        fs.writeFileSync(TRANSACTIONS_FILE, "[]");
    }
}

// Save accounts
export function saveAccounts(accounts: Account[]): void {

    ensureDataFiles();

    fs.writeFileSync(
        ACCOUNTS_FILE,
        JSON.stringify(accounts, null, 2)
    );
}

// Save transactions
export function saveTransactions(
    transactions: Transaction[]
): void {

    ensureDataFiles();

    fs.writeFileSync(
        TRANSACTIONS_FILE,
        JSON.stringify(transactions, null, 2)
    );
}

// Load accounts
export function loadAccounts(): Account[] {

    ensureDataFiles();

    const data = fs.readFileSync(ACCOUNTS_FILE, "utf-8");

    const accounts = JSON.parse(data) as Array<
        Omit<Account, "createdAt"> & { createdAt: string }
    >;

    return accounts.map(account => ({
        ...account,
        createdAt: new Date(account.createdAt)
    }));
}

// Load transactions
export function loadTransactions(): Transaction[] {

    ensureDataFiles();

    const data = fs.readFileSync(TRANSACTIONS_FILE, "utf-8");

    const transactions = JSON.parse(data) as Array<
        Omit<Transaction, "date"> & { date: string }
    >;

    return transactions.map(transaction => ({
        ...transaction,
        date: new Date(transaction.date)
    }));
}
