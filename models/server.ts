import express, { Application } from 'express';
import useRoutes from '../routes/usuario'
import db from '../db/connection'
import cosrs from 'cors'

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    };

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middelwares();
        this.routes();
    }

    async dbConnection() {

        try {

            await db.authenticate();
            console.log('Database Online');
            

        } catch(error) {

            throw new Error( 'error' );

        }
    }

    middelwares() {

        this.app.use( cosrs() );

        this.app.use( express.json() );

        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use( this.apiPaths.usuarios, useRoutes);

    }

    listen() {

        this.app.listen ( this.port, () => {

            console.log('Servidor corriendo en el puerto ' + this.port);
            
        });

    }

};

export default Server;
