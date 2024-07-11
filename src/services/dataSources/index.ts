import cache from "@/services/dataSources/cache";
import { data } from "@/services/dataSources/database";

export default () => {
    // TODO
    // Caching
    cache();
    return data();
};
