import { Application } from 'express';
import ProjectController from './controller/projectController';

export class Routes {
    public projectController: ProjectController = new ProjectController();

    public routes(app: Application): void {

        app.get('/getXmlTransactions', this.projectController.getXmlTransactions); 

        app.get('/getXmlTransactionsByCurrencyCode', this.projectController.getXmlTransactionsByCurrencyCode); 
        app.get('/uploadXmlFile', this.projectController.uploadXmlFile);
    }
}