import { Hono } from "hono";
import * as hono_types0 from "hono/types";

//#region src/server.d.ts
declare const app: Hono<hono_types0.BlankEnv, hono_types0.BlankSchema, "/">;
//#endregion
export { app as default };