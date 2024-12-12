import { getUrl } from "@/config/types/database";

import knex, { type Knex } from "knex";

const instance = knex({
    client: "cockroachdb",
    connection: getUrl(),
    pool: { min: 0, max: 20 },
});

export const get = (): Knex => instance;

export default {
    get,
};
