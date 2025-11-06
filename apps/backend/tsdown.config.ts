import { defineConfig } from "tsdown";

export default defineConfig({
	clean: true,
	entry: "./src/server.ts",
	format: ["esm"],
	noExternal: [/@medinfo\/.*/],
	outDir: "./dist",
	platform: "node",
	target: "esnext",
	treeshake: true,
});
