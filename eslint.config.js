import { zayne } from "@zayne-labs/eslint-config";

export default zayne({
	type: "app-strict",
	ignores: [".next/**", "eslint.config.js", "apps/frontend/next-env.d.ts"],
	react: {
		nextjs: {
			overrides: {
				"nextjs/no-html-link-for-pages": ["error", "apps/frontend"],
			},
		},
	},
	node: {
		security: true,
	},
	tailwindcssBetter: {
		settings: { entryPoint: "apps/frontend/tailwind.css" },
	},
	tanstack: true,
	typescript: {
		tsconfigPath: ["**/tsconfig.json"],
	},
	comments: {
		overrides: {
			"eslint-comments/require-description": "off",
		},
	},
}).overrides({
	"zayne/node/security/recommended": {
		files: ["apps/backend/src/**/*.ts"],
	},
});
