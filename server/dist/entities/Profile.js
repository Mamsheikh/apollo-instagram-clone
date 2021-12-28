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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const BaseColumn_1 = require("./BaseColumn");
const User_1 = require("./User");
let Profile = class Profile extends BaseColumn_1.BaseColumns {
    constructor(profile) {
        super();
        Object.assign(this, profile);
    }
    setProfilePhoto() {
        this.imgURL = this.imgURL.startsWith('images/')
            ? `${constants_1.EXPRESS_ENDPOINT}/${this.imgURL}`
            : this.imgURL === ''
                ? constants_1.GRAVATAR
                : this.imgURL;
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Profile.prototype, "imgURL", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Profile.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsUrl)(undefined, { message: 'Invalid Website URL' }),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Profile.prototype, "website", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], Profile.prototype, "bio", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Profile.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.profile),
    (0, typeorm_1.JoinColumn)({ name: 'username', referencedColumnName: 'username' }),
    __metadata("design:type", User_1.User)
], Profile.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Profile.prototype, "setProfilePhoto", null);
Profile = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('profiles'),
    __metadata("design:paramtypes", [Object])
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map