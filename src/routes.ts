import { Application } from 'express';
import ProjectController from './controller/projectController';

export class Routes {
    public projectController: ProjectController = new ProjectController();

    public routes(app: Application): void {

        app.get('/getXmlTransactions', this.projectController.getXmlTransactions); 
        app.get('/getCsvTransactions', this.projectController.getCsvTransactions); 
        app.get('/getCsvTransactions/:currency', this.projectController.getCsvTransactionByCurrency);

        app.get('/uploadCsvFile', this.projectController.uploadCsvFile); 
        app.get('/uploadXmlFile', this.projectController.uploadXmlFile);
    }
}