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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
require("dotenv/config");
const cloudinary_1 = require("cloudinary");
const User_1 = require("../entities/User");
const userData_json_1 = __importDefault(require("./userData.json"));
const profileData_json_1 = __importDefault(require("./profileData.json"));
const postData_json_1 = __importDefault(require("./postData.json"));
const Profile_1 = require("../entities/Profile");
const argon2_1 = require("argon2");
require("dotenv/config");
const Post_1 = require("../entities/Post");
const setupCloudinary_1 = __importDefault(require("../config/setupCloudinary"));
const constants_1 = require("../constants");
let hashedUserData = [];
userData_json_1.default.forEach((u) => __awaiter(void 0, void 0, void 0, function* () {
    hashedUserData.push(Object.assign(Object.assign({}, u), { password: yield (0, argon2_1.hash)('bob123') }));
}));
class CreateMockData {
    run(_factory, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.dropDatabase();
            yield connection.synchronize();
            (0, setupCloudinary_1.default)();
            yield cloudinary_1.v2.api.delete_resources_by_prefix(constants_1.CLOUDINARY_ROOT_PATH);
            yield connection
                .createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values(hashedUserData)
                .execute();
            yield connection
                .createQueryBuilder()
                .insert()
                .into(Profile_1.Profile)
                .values(profileData_json_1.default)
                .execute();
            yield connection
                .createQueryBuilder()
                .insert()
                .into(Post_1.Post)
                .values(postData_json_1.default)
                .execute();
        });
    }
}
exports.default = CreateMockData;
//# sourceMappingURL=createFakeData.js.map