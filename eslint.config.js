import { zayne, allowedNextJsExportNames } from "@zayne-labs/eslint-config";

export default zayne(
	{
		ignores: [".next/**", "eslint.config.js", "apps/frontend/next-env.d.ts"],
		react: {
			nextjs: {
				overrides: {
					"nextjs/no-html-link-for-pages": ["error", "apps/frontend"],
				},
			},
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
