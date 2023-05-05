import { Router } from "express";

import { getAppoimentsbyEmail, getStaffMemebers, getStaffSchedule, getAppoimentsAdmins, getStaffIdByName, getStaffMemebersById, getAppoimentsForWeek, testing } from "../controllers/appoiments.controller.js";

const router = Router();

router.get("/getAppoiments/:email",getAppoimentsbyEmail);

router.get("/getAppoimentsWeek/:email",getAppoimentsForWeek);

router.get("/getStaffMemebers",getStaffMemebers);

router.get("/getStaff/:id",getStaffMemebersById);

router.post("/getStaffSchedule",getStaffSchedule);

router.post("/getStaffApoiment",getAppoimentsAdmins);

router.get("/getStaffId/:email",getStaffIdByName);

router.get("/rutatest", testing)
 
export default router;