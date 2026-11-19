import { Router, type IRouter } from "express";
import healthRouter from "./health";
import businessesRouter from "./businesses";
import leadsRouter from "./leads";
import bookingsRouter from "./bookings";
import templatesRouter from "./templates";
import aiRouter from "./ai";

const router: IRouter = Router();

router.use(healthRouter);
router.use(businessesRouter);
router.use(leadsRouter);
router.use(bookingsRouter);
router.use(templatesRouter);
router.use(aiRouter);

export default router;
