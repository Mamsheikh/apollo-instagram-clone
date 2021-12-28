"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrors = void 0;
const formatErrors = (errors) => {
    let formattedErrors = [];
    errors.forEach(({ property, constraints }) => {
        formattedErrors.push({
            path: property,
            message: Object.values(constraints)[0],
        });
    });
    return formattedErrors;
};
exports.formatErrors = formatErrors;
//# sourceMappingURL=index.js.map