import { Request, Response, NextFunction } from 'express';
import { validateCsvData, validateXmlData } from './../service/parser';
import TransactionService from '../service/transactionService';

const xml2js = require('xml2js');
const csv = require('fast-csv');
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
            let result = await transactionService.getXmlTransactionByCurrencyCode(currency);

            res.status(200).json(result);
        } catch (err) {
            res.status(401).json(err);
        }
    }

    public async uploadCsvFile (req: Request, res: Response) {
        const fileRows = <any>[];
        try {
            var stream = fs.createReadStream(__dirname + '/transactions.csv');
            // csv.fromPath(req.file.path)
            stream
            .pipe(
                csv.parse({ headers: true })
            )
            .on('error',function(data: any){  
                //add errors
            })
            .on('data',function(data: any){  
                fileRows.push(data);
            })
            .on('end', function(data: any){
                const validationError = validateCsvData(fileRows);
                
                if (validationError) {
                    return res.status(403).json({ error: validationError });
                }
                //todo: save to mongo db
                console.log(fileRows)
                return res.json({ message: "valid csv" })
            })
        } catch(err) {
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