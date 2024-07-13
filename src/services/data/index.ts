import cache from "@/services/data/cache";
import data from "@/services/data/database";

export default () => {
    // TODO
    // Caching
    cache();
    return data();
};
