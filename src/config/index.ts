import { getConfig as getCache } from "@/config/types/cache";
import { getConfig as getDatabase } from "@/config/types/database";
import { getConfig as getServer } from "@/config/types/server";
import load from "@/config/file";

export default Promise.all([
    load("cache", getCache()),
    load("database", getDatabase()),
    load("server", getServer()),
]);
