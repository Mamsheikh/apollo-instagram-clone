"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const types_1 = require("../types/types");
const entities_1 = require("../entities");
const class_validator_1 = require("class-validator");
const utils_1 = require("../lib/utils");
const tokenHandler_1 = require("../utils/tokenHandler");
let UserResolver = class UserResolver {
    register({ res }, { email, username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = [];
            const userEmail = yield entities_1.User.findOne({ email });
            const userUsername = yield entities_1.User.findOne({ username });
            if (userEmail) {
                errors.push({ path: 'email', message: 'Email is already registered' });
            }
            if (userUsername) {
                errors.push({ path: 'username', message: 'Username is already taken' });
            }
            if (errors.length > 0) {
                return {
                    ok: false,
                    errors,
                };
            }
            const user = yield entities_1.User.create({ email, username, password });
            errors = yield (0, class_validator_1.validate)(user);
            if (errors.length > 0) {
                return {
                    ok: false,
                    errors: (0, utils_1.formatErrors)(errors),
                };
            }
            try {
                yield user.save();
                yield entities_1.Profile.create({ username: user.username }).save();
                (0, tokenHandler_1.createTokenCookie)(user, res);
                return { ok: true };
            }
            catch (error) {
                console.log('Register error', error);
                return {
                    ok: false,
                    errors: [{ path: 'Root Error', message: 'Unkown error' }],
                };
            }
        });
    }
    login(usernameOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield entities_1.User.findOne(usernameOrEmail.includes('@')
                    ? { where: { email: usernameOrEmail } }
                    : { where: { username: usernameOrEmail } });
                if (!user) {
                    return {
                        ok: false,
                        errors: [{ path: 'usernameOrEmail', message: 'User does not exist' }],
                    };
                }
                const valid = yield user.verifyPassword(password);
                if (!valid) {
                    return {
                        ok: false,
                        errors: [{ path: 'password', message: 'Incorrect Password' }],
                    };
                }
                return { ok: true, user };
            }
            catch (error) {
                return { ok: false };
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => types_1.RegisterResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, types_1.RegisterVariables]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => types_1.LoginResponse),
    __param(0, (0, type_graphql_1.Arg)('usernameOrEmail')),
    __param(1, (0, type_graphql_1.Arg)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(entities_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolvers.js.map