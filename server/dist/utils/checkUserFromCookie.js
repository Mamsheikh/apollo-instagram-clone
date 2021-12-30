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
exports.checkUserFromCookie = void 0;
const User_1 = require("./../entities/User");
const tokenHandler_1 = require("./tokenHandler");
const apollo_server_express_1 = require("apollo-server-express");
const constants_1 = require("./../constants");
const checkUserFromCookie = ({ res, req }) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies[constants_1.COOKIE_NAME];
    if (!token) {
        console.log('Something went wrong');
        throw new apollo_server_express_1.AuthenticationError('unauthorized');
    }
    const { username } = (0, tokenHandler_1.verifyToken)(token);
    if (!username) {
        console.log('something went wrong');
        throw new apollo_server_express_1.AuthenticationError('unauthorized');
    }
    const user = User_1.User.findOne({ username });
    if (!user) {
        throw new apollo_server_express_1.AuthenticationError('unauthorized');
    }
    res.locals.username = username;
    return { user };
});
exports.checkUserFromCookie = checkUserFromCookie;
//# sourceMappingURL=checkUserFromCookie.js.map