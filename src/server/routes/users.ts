import { get } from "@/server/handlers";
import user from "@/services/model/user";

import { Router } from "express";

export const generate = ({ find }: User.Controller) =>
    Router().get("/", get(find));

export default generate(user);
