import { Router } from "express";
import { jwtAuth } from "../middleware/jwtAuth.js";
import { taskRouter } from "./task.js";
import { userRouter } from "./user.js";

const router = Router();
router.use(jwtAuth) // 注入认证模块
router.use("/api", userRouter);
router.use("/api", taskRouter)

export default router;
