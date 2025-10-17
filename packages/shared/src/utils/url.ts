import path from "node:path";

/**
 * @description Resolves paths absolutely from the project root
 * @returns The absolute path
 */
export const resolvePathToCwd = (pathName: string) => {
	const cleanPath = pathName.startsWith("/") ? pathName.slice(1) : pathName;
	return path.resolve(process.cwd(), "../../", cleanPath);
};
