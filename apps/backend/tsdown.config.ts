import { defineConfig } from "tsdown";

export default defineConfig({
	clean: true,
	dts: true,
	entry: "./src/server.ts",
	format: ["esm"],
	outDir: "./dist",
	platform: "node",
	target: "esnext",
	treeshake: true,
});
