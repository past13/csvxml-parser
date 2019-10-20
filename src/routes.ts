import { Application } from 'express';
import ProjectController from './controller/projectController';

export class Routes {
    public projectController: ProjectController = new ProjectController();

    public routes(app: Application): void {
        app.get('/getXmlTransactions', this.projectController.getXmlTransactions); 
        app.get('/getXmlTransactions/currency', this.projectController.getXmlTransactionByCurrency);
        app.post('/getXmlTransactions/status', this.projectController.getXmlTransactionByStatus);

        app.get('/getCsvTransactions', this.projectController.getCsvTransactions); 
        app.get('/getCsvTransactions/currency', this.projectController.getCsvTransactionByCurrency);
        app.post('/getCsvTransactions/status', this.projectController.getCsvTransactionByStatus);

        app.get('/uploadCsvFile', this.projectController.uploadCsvFile); 
        app.post('/uploadXmlFile', (req, res) => {
            
        }); //this.projectController.uploadXmlFile
        
    }
}