import { Projects, ProjectSchema } from '../models/projectSchema';
import { TransactionModel } from '../models/transactionModel';
export default class SaveTransaction {

    public async saveTransaction (data: any) {
        // const project = await Projects.findOne({ name: name });

        data.forEach((transaction: any) => {
            const transactionId = transaction['$'].id;
            const transactionDate = transaction['TransactionDate'];
            const status = transaction['Status'];

            const result = new TransactionModel(
                                transactionId,
                                transactionDate,
                                status
                            );
        });
    }
}