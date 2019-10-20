import { Request, Response, NextFunction } from 'express';
import { validateCsvData, validateXmlData } from './../service/parser';
import TransactionCsvService from '../service/transactionCsvService';
import TransactionXmlService from '../service/transactionXmlService';

const xml2js = require('xml2js');
const csv = require('fast-csv');
import fs from 'fs';
const parser = new xml2js.Parser();

export default class ProjectController {

    public async getXmlTransactions (req: Request, res: Response) {
        const transactionXmlService: TransactionXmlService = new TransactionXmlService();
        try {
            let result = await transactionXmlService.getXmlTransactions();
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json(err);
        }
    }

    public async getCsvTransactions (req: Request, res: Response) {
        const transactionCsvService: TransactionCsvService = new TransactionCsvService();
        try {
            let result = await transactionCsvService.getCsvTransactions();
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json(err);
        }
    }
    
    public async getCsvTransactionByStatus (req: Request, res: Response) {
        const status = req.body.status
        const transactionCsvService: TransactionCsvService = new TransactionCsvService();
        let result;
        try {
            if (status) {
                result = await transactionCsvService.getCsvTransactionByStatus(status);
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json(err);
        }
    }

    public async getCsvTransactionByCurrency (req: Request, res: Response) {
        const transactionCsvService: TransactionCsvService = new TransactionCsvService();
        const currency = req.params.currency;
        let result;
        try {
            if (currency) {
                result = await transactionCsvService.getCsvTransactionByCurrency(currency);
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json(err);
        }
    }

    public async getXmlTransactionByStatus (req: Request, res: Response) {
        const status = req.body.status
        const transactionXmlService: TransactionXmlService = new TransactionXmlService();
        let result;
        try {
            if (status) {
                result = await transactionXmlService.getCsvTransactionByStatus(status);
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json(err);
        }
    }

    public async getXmlTransactionByCurrency (req: Request, res: Response) {
        const transactionXmlService: TransactionXmlService = new TransactionXmlService();
        const currency = req.params.currency;
        let result;
        try {
            if (currency) {
                result = await transactionXmlService.getXmlTransactionByCurrency(currency);
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json(err);
        }
    }

    public async uploadCsvFile (req: Request, res: Response) {
        const fileRows = <any>[];
        const transactionCsvService: TransactionCsvService = new TransactionCsvService();
        try {
            var stream = fs.createReadStream(__dirname + '/transactions.csv');
            // csv.fromPath(req.file.path)
            stream
            .pipe(
                csv.parse({ headers: true })
            )
            .on('error', async function(data: any){  
                //add errors
            })
            .on('data', async function(data: any){  
                fileRows.push(data);
            })
            .on('end', async function(data: any){
                const validationError = validateCsvData(fileRows);
                if (!validationError) {
                    console.log('not valid');
                } else {
                    await transactionCsvService.saveCsvTransaction(fileRows);
                }

                return res.json({ message: "valid csv" })
            })
        } catch(err) {
            res.status(401).json(err);
        }
    }

    public async uploadXmlFile (req: Request, res: Response) {
        const transactionXmlService: TransactionXmlService = new TransactionXmlService();
        try {
            let xml = __dirname + '/data.xml';
            fs.readFile(xml, "utf-8", async (error: any, text:any) => {
                if (error) {

                } else {
                    parser.parseString(text, async (err:any, result:any) => {
                        var transaction = result['Transactions']['Transaction'];
                        let transactionsList = await transactionXmlService.assignToObject(transaction);
                        const validationError = await validateXmlData(transactionsList);
                        if (validationError) {

                        }
                        await transactionXmlService.saveXmlTransaction(transactionsList);
                    });
                }
            });
            return res.json({ message: "valid xml" })
        } catch (err) {
            res.status(401).json(err);
        }
    }
}