import Data from "@/services/data";
import Handler from "@/server/handler";

export default (data: Data) => new Handler(data, ["/"]);