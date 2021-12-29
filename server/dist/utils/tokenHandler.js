"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createTokenCookie = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("./../constants");
const createTokenCookie = (user, res) => {
    res.cookie(constants_1.COOKIE_NAME, (0, jsonwebtoken_1.sign)({ username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    }), {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: constants_1._prod_ ? 'none' : 'lax',
        secure: constants_1._prod_,
    });
};
exports.createTokenCookie = createTokenCookie;
const verifyToken = (token) => {
    return (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=tokenHandler.js.map