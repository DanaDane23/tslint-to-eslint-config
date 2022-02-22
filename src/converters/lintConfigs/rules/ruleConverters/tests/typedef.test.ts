import { convertTypedef } from "../typedef";

describe(convertTypedef, () => {
    test("conversion without arguments", () => {
        const result = convertTypedef({
            ruleArguments: [],
        });

        expect(result).toEqual({
            rules: [
                {
                    ruleName: "@typescript-eslint/typedef",
                },
                {
                    ruleName: "@typescript-eslint/explicit-function-return-type",
                },
                {
                    ruleName: "@typescript-eslint/explicit-module-boundary-types",
                },
            ],
        });
    });

    test("conversion with an argument", () => {
        const result = convertTypedef({
            ruleArguments: [
                "parameter",
                "variable-declaration-ignore-function",
                "array-destructuring",
            ],
        });

        expect(result).toEqual({
            rules: [
                {
                    ruleArguments: [
                        {
                            parameter: true,
                            variableDeclarationIgnoreFunction: true,
                            arrayDestructuring: true,
                        },
                    ],
                    ruleName: "@typescript-eslint/typedef",
                },
                {
                    ruleName: "@typescript-eslint/explicit-function-return-type",
                },
                {
                    ruleName: "@typescript-eslint/explicit-module-boundary-types",
                },
            ],
        });
    });

    test("does conversion with call-signature and arrow-call-signature", () => {
        const result = convertTypedef({
            ruleArguments: ["call-signature", "arrow-call-signature"],
        });

        expect(result).toEqual({
            rules: [
                {
                    ruleName: "@typescript-eslint/typedef",
                },
                {
                    ruleArguments: [
                        {
                            allowDirectConstAssertionInArrowFunctions: false,
                            allowHigherOrderFunctions: false,
                            allowTypedFunctionExpressions: false,
                        },
                    ],
                    ruleName: "@typescript-eslint/explicit-function-return-type",
                },
                {
                    ruleArguments: [
                        {
                            allowDirectConstAssertionInArrowFunctions: false,
                            allowHigherOrderFunctions: false,
                            allowTypedFunctionExpressions: false,
                        },
                    ],
                    ruleName: "@typescript-eslint/explicit-module-boundary-types",
                },
            ],
        });
    });
});
