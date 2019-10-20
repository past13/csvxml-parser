import { Projects, ProjectSchema } from '../models/projectSchema';
import { TransactionModel } from '../models/transactionModel';
export default class SaveTransaction {

    public async assignToObject(data:any) {
        let transactions = <any>[];

        data.forEach((transaction: any) => {
            const transactionId = transaction['$'].id;
            const transactionDate = transaction['TransactionDate'];
            const amount = transaction['PaymentDetails'][0]['Amount'];
            const currency = transaction['PaymentDetails'][0]['CurrencyCode'][0];
            const status = transaction['Status'];

            transaction = new TransactionModel(
                                transactionId,
                                transactionDate,
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

                const project = new Projects({
                                    transactionId,
                                    transactionDate,
                                    status
                                });

                await project.save();
            });
        } catch(err) {
            
        }
        
        return;
    }
}