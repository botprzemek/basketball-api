import production from "@/services/data/database/mock";
import mocked from "@/services/data/database/mock";

export default () => {
    if (process.env.NODE_ENV === "production") {
        return production();
    }

    return mocked();
};
