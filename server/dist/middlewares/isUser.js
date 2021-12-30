"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = void 0;
const checkUserFromCookie_1 = require("../utils/checkUserFromCookie");
const isUser = ({ context }, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, checkUserFromCookie_1.checkUserFromCookie)(context);
    }
    catch (error) {
        console.log(error);
    }
    return next();
});
exports.isUser = isUser;
//# sourceMappingURL=isUser.js.map