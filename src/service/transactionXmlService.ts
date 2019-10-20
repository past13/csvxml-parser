import { XmlTransactions } from '../models/xmlTransactions';
import { TransactionModel } from '../models/transactionModel';
export default class TransactionCsvService {

    public async getXmlTransactions() {
        return await XmlTransactions.find({}, (err, project) => {
             if (!err ) {
                 console.log('get transactions');
            } else {
                return err;
            }
        });
    }

    public async getCsvTransactionByStatus(data: any) {
        return await XmlTransactions.findOne({ status: data}, (err, result) => {
            if (!err ) {
                return result;
            } else {
                return err;
            }
        });
    }

    public async getXmlTransactionByCurrency(currency: string) {
        return await XmlTransactions.findOne({currency : currency}, (err, project) => {
            if (!err ) {
                return project;
            } else {
                return err;
            }
        });
    }

    public async assignToObject(data:any) {
        let transactions = <any>[];

        data.forEach((transaction: any) => {
            const transactionId = transaction['$'].id;
            const transactionDate = transaction['TransactionDate'];
            const currency = transaction['PaymentDetails'][0]['CurrencyCode'][0];
            const amount = transaction['PaymentDetails'][0]['Amount'][0];
            const status = transaction['Status'];


            transaction = new TransactionModel(
                                transactionId,
                                transactionDate,
                                currency,
                                amount,
                                status
                            );

            transactions.push(transaction);
        });

        return transactions;
    }

    public async saveXmlTransaction (data: any) {
        try {
            data.forEach(async (item: any) => {
                await XmlTransactions.findOne({ transactionId: item.TransactionId },async (err, result) => {
                    if (!result) {
                        const transactionId = item.TransactionId;
                        const transactionDate = item.TransactionDate[0];
                        const status = item.Status[0];
                        const amount = item.Amount;
                        const currency = item.Currency;
        
                        const xml = new XmlTransactions({
                                            transactionId,
                                            transactionDate,
                                            currency,
                                            amount,
                                            status,
                                        });
                        await xml.save();
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