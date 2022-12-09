import { Router } from "express";

import {getProfesores, getProfesor, loginProfesor } from "../controllers/profesores.controller";

const router = Router();

router.get("/getProfesores",getProfesores);

router.get("/getProfesor/:id",getProfesor);

router.post("/login",loginProfesor);

export default router;