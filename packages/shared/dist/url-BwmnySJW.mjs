import path from "node:path";

//#region src/utils/url.ts
/**
 * @description Resolves paths absolutely from the project root
 * @returns The absolute path
 */
const resolvePathToCwd = (pathName) => {
	const cleanPath = pathName.startsWith("/") ? pathName.slice(1) : pathName;
	return path.resolve(process.cwd(), "../../", cleanPath);
};

//#endregion
export { resolvePathToCwd as t };
//# sourceMappingURL=url-BwmnySJW.mjs.map
