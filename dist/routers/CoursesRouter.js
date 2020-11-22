"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CoursesController_1 = __importDefault(require("../controllers/CoursesController"));
const router = express_1.Router();
const coursesController = new CoursesController_1.default();
router.get('/courses', coursesController.get);
exports.default = router;
