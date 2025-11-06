//#region src/utils/common.d.ts
/**
 * @description
 * - This function is used to evaluate a string as js and return the result
 * - It uses globalThis.eval to to achieve indirect eval {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#indirect_eval|(see article)}
 * @param value
 * @returns The result of the evaluation
 */
declare const evaluateString: <TResult>(value: string) => TResult;
//#endregion
export { evaluateString };
//# sourceMappingURL=common.d.mts.map