import express from 'express';
import config from './config';

import bodyParser from 'body-parser' 

import profesoresRoutes from './routes/profesores.routes'
import reportesRoutes from './routes/reportes.routes'

const app = express();

let port;

//setings
app.set('port', config.port);

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // create application/json parser
// var jsonParser = bodyParser.json()
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(profesoresRoutes);
app.use(reportesRoutes);

export default app;