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
            path: "/knowledge-bases/slugs",
            handler: "api::knowledge-base.knowledge-base.getAllSlugs",
            config: {
                policies: [],
            },
        },
        {
            method: "GET",
            path: "/knowledge-bases/:slug",
            handler: "api::knowledge-base.knowledge-base.getBySlug",
            config: {
                policies: [],
            },
        },
    ],
};
