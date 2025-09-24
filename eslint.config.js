import { zayne, allowedNextJsExportNames } from "@zayne-labs/eslint-config";

export default zayne(
	{
		ignores: [".next/**", "eslint.config.js"],
		react: {
			nextjs: true,
		},
		tailwindcssBetter: {
			settings: { entryPoint: "apps/frontend/tailwind.css" },
		},
		tanstack: true,
		typescript: {
			tsconfigPath: ["./**/tsconfig.json"],
		},
	},
	{
		files: ["backend/src/**/*.ts"],
		rules: {
			"import/default": "off",
			"import/no-named-as-default-member": "off",
			"node/no-process-env": "error",
		},
	}
);
