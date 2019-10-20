export class TransactionModel {
    TransactionId: Number;
    TransactionDate: Date;
    Currency: String;
    Amount: String;
    Status: String;
    UpdatedAt: Number;

    constructor(transactionId: any, transactionDate: any,  currency: any, amount: any, status: string) {
        this.TransactionId = transactionId;
        this.TransactionDate = transactionDate;
        this.Currency = currency;
        this.Amount = amount;
        this.Status = status;
        this.UpdatedAt = Date.now();
    }
}