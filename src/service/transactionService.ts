import { Projects } from '../models/projectSchema';
import { TransactionModel } from '../models/transactionModel';
export default class TransactionService {

    public async getXmlTransactions() {
        return await Projects.find({}, (err, project) => {
             if (!err ) {
                 console.log('get transactions');
            } else {
                return err;
            }
        });
    }

    public async getXmlTransactionByCurrencyCode(currency: string) {
        return await Projects.findOne({}, (err, project) => {
            if (!err ) {
                console.log('get transactions');
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

    public async saveTransaction (data: any) {
        // const project = await Projects.findOne({ name: name });
        try {
            data.forEach(async (item: any) => {
                const transactionId = item.TransactionId;
                const transactionDate = item.TransactionDate[0];
                const status = item.Status[0];
                const amount = item.Amount;
                const currency = item.Currency;



                const project = new Projects({
                                    transactionId,
                                    transactionDate,
                                    currency,
                                    amount,
                                    status,
                                });
                console.log(project);
                await project.save();
                console.log('saved')
            });
        } catch(err) {
                console.log('error')
        }
        
        return;
    }
}