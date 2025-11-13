import { Hono } from "hono";

const appointmentsRoutes = new Hono().basePath("/appointments");

export { appointmentsRoutes };
