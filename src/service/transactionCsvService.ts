import { XmlTransactions } from '../models/xmlTransactions';
export default class TransactionCsvService {

    public async getCsvTransactions() {
        return await XmlTransactions.find({}, (err, project) => {
             if (!err ) {
                 console.log('get transactions');
            } else {
                return err;
            }
        });
    }
}