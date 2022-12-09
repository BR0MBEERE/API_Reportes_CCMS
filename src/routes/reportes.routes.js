import { Router } from "express";

import {getReporesByProfId, addReporte, getDetallesReporte} from "../controllers/reportes.controller"

const routerReportes = Router();

routerReportes.get("/getReportesProfe/:idProf",getReporesByProfId);

routerReportes.get('/getDetallesReporte/:idReport', getDetallesReporte);

routerReportes.post("/addReporte",addReporte);

export default routerReportes;