import { Request, Response, NextFunction } from 'express';
import { validateXmlData } from './../service/parser';

import TransactionService from '../service/transactionService';

const xml2js = require('xml2js');
import fs from 'fs';
const parser = new xml2js.Parser();

export default class ProjectController {

public async getXmlTransactions (req: Request, res: Response) {
        const transactionService: TransactionService = new TransactionService();
        try {
            let result = await transactionService.getXmlTransactions();
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json(err);
        }
    }

    public async getXmlTransactionsByCurrencyCode (req: Request, res: Response) {
        const transactionService: TransactionService = new TransactionService();
        const currency = req.query.currency;
        try {

            res.status(200).json();
        } catch (err) {
            res.status(401).json(err);
        }
    }

    public async uploadXmlFile (req: Request, res: Response) {
        const transactionService: TransactionService = new TransactionService();
        try {
            let xml = __dirname + '/data.xml';
            fs.readFile(xml, "utf-8", async (error: any, text:any) => {
                if (error) {

                } else {
                    parser.parseString(text, async (err:any, result:any) => {
                        var transaction = result['Transactions']['Transaction'];
                        let transactionsList = await transactionService.assignToObject(transaction);
                        const validationError = await validateXmlData(transactionsList);
                        if (validationError) {

                        }
                        await transactionService.saveTransaction(transactionsList);
                    });
                }
            });
            return res.json({ message: "valid xml" })
        } catch (err) {
            res.status(401).json(err);
        }
    }
}