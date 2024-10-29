import { getUrl, getOptions } from "@/config/database";

import postgres from "postgres";

const instance: postgres.Sql = postgres(getUrl(), getOptions());

export const get = (): postgres.Sql => instance;

export default {
    get,
};
