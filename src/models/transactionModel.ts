export class TransactionModel {
    TransactionId: number;
    TransactionDate: Date;
    Status: String;
    UpdatedAt: number;
    
    constructor(transactionId: any, transactionDate: any, status: string) {
        this.TransactionId = transactionId;
        this.TransactionDate = transactionDate;
        this.Status = status;
        this.UpdatedAt = Date.now();
    }
}