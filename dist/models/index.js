"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skills = exports.User = exports.dbConfig = void 0;
const sequelize = __importStar(require("sequelize"));
const user_model_1 = require("./user-model");
const user_model_2 = require("./user-model");
exports.dbConfig = new sequelize.Sequelize((process.env.DB_NAME = "rest_resume_api"), (process.env.DB_USER = "john"), (process.env.DB_PASSWORD = "password"), {
    port: Number(process.env.DB_PORT) || 54320,
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
    },
});
// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
exports.User = user_model_1.UserFactory(exports.dbConfig);
// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
exports.Skills = user_model_2.SkillsFactory(exports.dbConfig);
