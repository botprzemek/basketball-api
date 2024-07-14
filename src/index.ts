import ServerConfig from "@/config/server";
import Server from "@/server";
import CacheConfig from "@/config/cache";

import { Redis } from "ioredis";
import DatabaseConfig from "@/config/database";

import pg from "pg";

new ServerConfig();
new Server().listen();

new CacheConfig();
const cache = new Redis(CacheConfig.get());

new DatabaseConfig();
const database = new pg.Pool(DatabaseConfig.getUrl());
