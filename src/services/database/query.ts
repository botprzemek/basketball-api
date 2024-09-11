import postgres from "postgres";
import Config from "@/config/database";

const config = new Config();

console.log(config.getUrl());

export default postgres(config.getUrl(), config.getOptions())