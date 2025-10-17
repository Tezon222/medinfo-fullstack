import { defineConfig } from "tsdown";

export default defineConfig({
	clean: true,
	entry: "./src/app/server.ts",
	format: "esm",
	noExternal: [/@medinfo\/backend-\/.*/],
	outDir: "./dist",
});
