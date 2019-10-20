import { CsvTransactions } from '../models/csvTransactions';

export default class TransactionCsvService {

    public async getCsvTransactionByStatus(data:any) {
        return await CsvTransactions.findOne({ status: data}, (err, result) => {
            if (!err ) {
                return result;
            } else {
                return err;
            }
        });
    }

    public async getCsvTransactionByCurrency(data:any) {
        return await CsvTransactions.findOne({ currency: data}, (err, result) => {
             if (!err ) {
                return result;
            } else {
                return err;
            }
        });
    }

    public async getCsvTransactions() {
        return await CsvTransactions.find({}, (err, result) => {
             if (!err ) {
                return result;
            } else {
                return err;
            }
        });
    }

    public async saveCsvTransaction (data: any) {
        try {
            data.forEach(async (item: any) => {
                await CsvTransactions.findOne({ transactionId: item.TransactionId }, async (err, result) => {
                    if (!result) {

                        const transactionId = item.TransactionId.trim();
                        const transactionDate = item.TransactionDate;
                        const status = item.Status;
                        const amount = item.Amount;
                        const currency = item.CurrencyCode;
        
                        const csv = new CsvTransactions({
                                            transactionId,
                                            transactionDate,
                                            currency,
                                            amount,
                                            status,
                                        });
                        await csv.save();
                    } else {
                         console.log('exist'); 
                    }
                });
            });
        } catch(err) {
                console.log('error')
        }
        
        return;
    }
}