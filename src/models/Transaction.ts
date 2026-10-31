export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
    TRANSFER = 'TRANSFER'
}

export interface Transaction {
    transactionId: String,
    accountNumber: number,
    type: TransactionType,
    amount: number,
    date: Date
}