import express from 'express';
import config from './config';

import bodyParser from 'body-parser' 

import appoimentsRoutes from './routes/appoiments.route'

const app = express();

let port;
app.set('port', config.port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(appoimentsRoutes);

export default app;