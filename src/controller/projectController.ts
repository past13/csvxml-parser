import { Request, Response, NextFunction } from 'express';

const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

export default class ProjectController {
    public async uploadXmlFile (req: Request, res: Response) {
        try {
            let xml = __dirname + '/data.xml';
            fs.readFile(xml, "utf-8", function (error: any, text:any) {
                if (error) {

                } else {
                    parser.parseString(text, function (err:any, result:any) {
                        var transaction = result['Transactions']['Transaction'];
                    });
                }
            });

            return res.json({ message: "valid xml" })

        } catch (err) {
            res.status(401).json(err);
        }
    }
}