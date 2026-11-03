#  Banking Management System

**Version:** 1.0.0  
**Tech Stack:** TypeScript | Node.js | Vitest  
**Repository:** [https://github.com/vikasprajapati3/banking-system](https://github.com/vikasprajapati3/banking-system)

##  Overview
A beginner-friendly, CLI-based Banking Management System built using TypeScript and Node.js. It simulates basic banking operations with JSON file-based data storage and automated testing.

##  Features
* Create bank accounts with unique account numbers (minimum 8 digits).
* Deposit and withdraw money.
* Transfer money between accounts.
* Check account balances.
* View transaction history.
* Store account and transaction data using JSON files.
* Interactive command-line interface.
* Automated testing using Vitest.

## 🛠️ Technologies Used
* **TypeScript** – Application development
* **Node.js** – Runtime environment
* **JSON** – Data storage
* **Vitest** – Automated testing

## 📁 Project Structure
```text
banking-system/
├── src/
│   ├── models/
│   ├── services/
│   ├── utils/
│   ├── menu.ts
│   └── index.ts
├── data/
│   ├── accounts.json
│   └── transactions.json
├── tests/
│   └── Bank.test.ts
├── package.json
├── tsconfig.json
└── README.md

```

##  Installation & Setup

1. **Clone the repository**
```bash
git clone [https://github.com/vikasprajapati3/banking-system](https://github.com/vikasprajapati3/banking-system)

```


2. **Navigate to the project directory**
```bash
cd banking-system

```


3. **Install dependencies**
```bash
npm install

```



## Run the Application

Compile and start the interactive CLI application:

```bash
npm run build
npm start

```

## Run Tests

Execute automated tests using Vitest:

```bash
npm test

```

## Data Storage

The application uses JSON files for persistent local data storage:

* `accounts.json` – Stores account details and balances.
* `transactions.json` – Stores transaction records and history.

## Future Improvements

* User authentication and PIN security.
* Account management features.
* Transaction search and filtering.
* Database integration.
* REST API support.

## 📌 Version

* **Current Release:** 1.0.0

## Disclaimer

This project is developed for educational purposes only. It is a basic banking simulation and is not intended for real-world banking or financial transactions.

