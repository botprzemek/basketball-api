import { getRouterOptions } from "@/config/types/server";
import users from "@/server/routes/users";

import { Router } from "express";

export default Router(getRouterOptions()).use("/users", users);
