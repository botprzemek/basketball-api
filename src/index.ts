import { listen } from "@/server";
import {getToken} from "@/config/types/server";

console.log(getToken().secret);

listen();