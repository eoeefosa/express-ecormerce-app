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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPIRES_IN = exports.JWT_SECERT = exports.MONGOS_CONNECTION_LINK = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
_a = process.env, exports.PORT = _a.PORT, exports.MONGOS_CONNECTION_LINK = _a.MONGOS_CONNECTION_LINK, exports.JWT_SECERT = _a.JWT_SECERT, exports.EXPIRES_IN = _a.EXPIRES_IN;
const DBConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(exports.MONGOS_CONNECTION_LINK);
        console.log("MONGODB connected ........");
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
exports.default = {
    connect: DBConnection,
};
