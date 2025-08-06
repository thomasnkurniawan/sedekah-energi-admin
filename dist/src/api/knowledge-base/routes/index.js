"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knowledge_base_1 = __importDefault(require("./knowledge-base"));
exports.default = {
    type: 'content-api',
    routes: [
        ...knowledge_base_1.default.routes,
    ],
};
