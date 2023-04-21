import { Router } from "express";

import { getAppoimentsbyEmail, getStaffMemebers, getStaffSchedule, getAppoimentsAdmins, testing } from "../controllers/appoiments.controller";

const router = Router();

router.get("/getaAppoiments/:email",getAppoimentsbyEmail);

router.get("/getStaffMemebers",getStaffMemebers);

router.post("/getStaffSchedule",getStaffSchedule);

router.post("/getStaffApoiment",getAppoimentsAdmins);

router.get("/rutaTest",testing);
 
export default router;