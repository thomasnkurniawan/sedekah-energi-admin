"use strict";
/**
 * knowledge-base router
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "GET",
            path: "/knowledge-bases",
            handler: "api::knowledge-base.knowledge-base.customFindAll",
            config: {
                policies: [],
            },
        },
        {
            method: "GET",
            path: "/knowledge-bases/:id",
            handler: "api::knowledge-base.knowledge-base.getKnowledgeById",
            config: {
                policies: [],
            },
        },
        {
            method: "GET",
            path: "/knowledge-bases/preview",
            handler: "api::knowledge-base.knowledge-base.getKnowledgePreview",
            config: {
                policies: [],
            },
        },
    ],
};
