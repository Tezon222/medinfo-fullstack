export default {
	"*.{js,ts,tsx,mjs}": () => "pnpm lint:eslint",
	"*.{ts,tsx}": () => "pnpm lint:type-check",
};
