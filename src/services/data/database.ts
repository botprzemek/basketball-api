import postgres from "postgres";
import { getUrl, getOptions } from "@/config/types/database";

const instance: postgres.Sql = postgres(getUrl(), getOptions());

export const get = (): postgres.Sql => instance;

export default {
    get,
};
