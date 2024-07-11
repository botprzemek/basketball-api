import * as production from "@/services/dataSources/database/mock";
import * as mocked from "@/services/dataSources/database/mock";

export default () => {
    if (process.env.NODE_ENV === "production") {
        return production;
    }

    return mocked;
};
