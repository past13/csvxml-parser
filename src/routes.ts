import { Application } from 'express';
import ProjectController from './controller/projectController';

var multer  =   require('multer');


export class Routes {
    public projectController: ProjectController = new ProjectController();
    
    public routes(app: Application): void {
        var storage =   multer.diskStorage({
            destination: function (req: any, file: any, callback: (arg0: null, arg1: string) => void) {
                callback(null, './uploads');
            },
            filename: function (req: any, file: { fieldname: string; }, callback: (arg0: null, arg1: string) => void) {
                callback(null, file.fieldname + '-' + Date.now());
            }
        });

        var upload = multer(
            { storage : storage }, 
            { limits : { fieldNameSize : 1 }}).single('userPhoto');

        app.get('/getXmlTransactions', this.projectController.getXmlTransactions); 
        app.get('/getXmlTransactions/currency', this.projectController.getXmlTransactionByCurrency);
        app.post('/getXmlTransactions/status', this.projectController.getXmlTransactionByStatus);

        app.get('/getCsvTransactions', this.projectController.getCsvTransactions); 
        app.get('/getCsvTransactions/currency', this.projectController.getCsvTransactionByCurrency);
        app.post('/getCsvTransactions/status', this.projectController.getCsvTransactionByStatus);

        app.get('/uploadCsvFile', upload, this.projectController.uploadCsvFile); 
        app.post('/uploadXmlFile', upload, this.projectController.uploadXmlFile); 
        
    }
}