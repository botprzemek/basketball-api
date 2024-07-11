import { Router } from "express";
import { Handler } from "@/handlers/v1/players";

const router: Router = Router();

router.get("/", Handler.get);
router.post("/", Handler.create);
router.put("/", Handler.update);
router.delete("/", Handler.remove);

// TODO
// Parameter search
// router.get("/param", getPlayerBy);

export default router;
