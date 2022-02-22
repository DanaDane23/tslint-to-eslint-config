import { RuleConverter } from "../ruleConverter";

export const convertTypedef: RuleConverter = (tslintRule) => {
    const typedefRule: Record<string, boolean> = {};
    const functionReturnRule: Record<string, boolean> = {};
    const moduleBoundaryRule: Record<string, boolean> = {};

    if (tslintRule.ruleArguments.includes("call-signature")) {
        functionReturnRule.allowTypedFunctionExpressions = false;
        functionReturnRule.allowHigherOrderFunctions = false;

        moduleBoundaryRule.allowTypedFunctionExpressions = false;
        moduleBoundaryRule.allowHigherOrderFunctions = false;
    }

    if (tslintRule.ruleArguments.includes("arrow-call-signature")) {
        functionReturnRule.allowTypedFunctionExpressions = false;
        functionReturnRule.allowHigherOrderFunctions = false;
        functionReturnRule.allowDirectConstAssertionInArrowFunctions = false;

        moduleBoundaryRule.allowTypedFunctionExpressions = false;
        moduleBoundaryRule.allowHigherOrderFunctions = false;
        moduleBoundaryRule.allowDirectConstAssertionInArrowFunctions = false;
    }

    if (tslintRule.ruleArguments.includes("parameter")) {
        typedefRule.parameter = true;
    }

    if (tslintRule.ruleArguments.includes("arrow-parameter")) {
        typedefRule.arrowParameter = true;
    }

    if (tslintRule.ruleArguments.includes("property-declaration")) {
        typedefRule.propertyDeclaration = true;
    }

    if (tslintRule.ruleArguments.includes("variable-declaration")) {
        typedefRule.variableDeclaration = true;
    }

    if (tslintRule.ruleArguments.includes("variable-declaration-ignore-function")) {
        typedefRule.variableDeclarationIgnoreFunction = true;
    }

    if (tslintRule.ruleArguments.includes("member-variable-declaration")) {
        typedefRule.memberVariableDeclaration = true;
    }

    if (tslintRule.ruleArguments.includes("object-destructuring")) {
        typedefRule.objectDestructuring = true;
    }

    if (tslintRule.ruleArguments.includes("array-destructuring")) {
        typedefRule.arrayDestructuring = true;
    }

    return {
        rules: [
            {
                ...(Object.keys(typedefRule).length !== 0 && {
                    ruleArguments: [typedefRule],
                }),
                ruleName: "@typescript-eslint/typedef",
            },
            {
                ...(Object.keys(functionReturnRule).length !== 0 && {
                    ruleArguments: [functionReturnRule],
                }),
                ruleName: "@typescript-eslint/explicit-function-return-type",
            },
            {
                ...(Object.keys(moduleBoundaryRule).length !== 0 && {
                    ruleArguments: [moduleBoundaryRule],
                }),
                ruleName: "@typescript-eslint/explicit-module-boundary-types",
            },
        ],
    };
};
