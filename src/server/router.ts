import { Router } from "express";
import players from "@/server/routes/players";

const router: Router = Router();

router.use("/players", players);

export default router;
