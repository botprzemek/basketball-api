import Data from "@/services/data";
import Route from "@/server/router/route";

import { Router } from "express";

export default {
    players: (data: Data): Router => {
        return new Route(data).register("/").register("/:id").get();
    },
};
