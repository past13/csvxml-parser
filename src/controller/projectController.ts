import { Request, Response, NextFunction } from 'express';
import { validateXmlData } from './../service/parser';

import SaveTransaction from './../service/saveTransaction';

const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();


export default class ProjectController {

    public async uploadXmlFile (req: Request, res: Response) {
       try {
            let xml = __dirname + '/data.xml';
            fs.readFile(xml, "utf-8", async (error: any, text:any) => {
                if (error) {

                } else {
                    parser.parseString(text, async (err:any, result:any) => {
                        const saveTransaction = new SaveTransaction();
                        var transaction = result['Transactions']['Transaction'];

                        let transactionsList = await saveTransaction.assignToObject(transaction);

                        const validationError = await validateXmlData(transactionsList);
                        if (validationError) {
                        }
                        
                        await saveTransaction.saveTransaction(transactionsList);

                    });
                }
            });

            return res.json({ message: "valid xml" })

        } catch (err) {
            res.status(401).json(err);
        }
    }
}