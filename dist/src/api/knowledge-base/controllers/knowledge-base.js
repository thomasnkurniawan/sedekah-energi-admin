"use strict";
/**
 * knowledge-base controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async customFindAll(ctx) {
        const { page = 1, pageSize = 3, sort = "latest", search = "", category, } = ctx.query;
        const pageNum = Number(page);
        const pageSizeNum = Number(pageSize);
        const start = (pageNum - 1) * pageSizeNum;
        const filters = {
            publishedAt: { $not: null },
        };
        if (search) {
            filters.HeadingTitle = { $containsi: search };
        }
        if (category) {
            filters.Category = {
                Slug: { $eq: category },
            };
        }
        const sortOption = (() => {
            switch (sort) {
                case "latest":
                    return [{ createdAt: "desc" }];
                case "oldest":
                    return [{ createdAt: "asc" }];
                case "az":
                    return [{ HeadingTitle: "asc" }];
                case "za":
                    return [{ HeadingTitle: "desc" }];
                default:
                    return [{ createdAt: "desc" }];
            }
        })();
        const [entries, total] = await Promise.all([
            strapi.db.query("api::knowledge-base.knowledge-base").findMany({
                where: filters,
                orderBy: sortOption,
                offset: start,
                limit: pageSizeNum,
                populate: {
                    HeadingImage: true,
                    Content: {
                        populate: {
                            ContentSection: true,
                        },
                    },
                    Category: true,
                },
            }),
            strapi.db.query("api::knowledge-base.knowledge-base").count({
                where: filters,
            }),
        ]);
        console.log(entries);
        const simplifiedData = entries.map((entry) => {
            var _a, _b, _c, _d, _e, _f;
            return ({
                id: entry.id,
                title: entry.HeadingTitle,
                subtitle: entry.HeadingSubtitle,
                slug: entry.Slug,
                category: (_a = entry.Category) === null || _a === void 0 ? void 0 : _a.map((category) => ({
                    id: category.id,
                    name: category.Category,
                    slug: category.Slug,
                })),
                headingImageUrl: ((_d = (_c = (_b = entry.HeadingImage) === null || _b === void 0 ? void 0 : _b.formats) === null || _c === void 0 ? void 0 : _c.medium) === null || _d === void 0 ? void 0 : _d.url) || ((_e = entry.HeadingImage) === null || _e === void 0 ? void 0 : _e.url),
                headingColor: entry.HeadingColor,
                sections: (_f = entry.Content) === null || _f === void 0 ? void 0 : _f.map((section) => {
                    var _a;
                    return ({
                        sectionTitle: section.TitleSection,
                        content: (_a = section.ContentSection) === null || _a === void 0 ? void 0 : _a.filter((item) => (item === null || item === void 0 ? void 0 : item.Title) || (item === null || item === void 0 ? void 0 : item.Content)).map((item) => ({
                            title: item === null || item === void 0 ? void 0 : item.Title,
                            content: item === null || item === void 0 ? void 0 : item.Content,
                        })),
                    });
                }),
                createdAt: entry.createdAt,
                updatedAt: entry.updatedAt,
                publishedAt: entry.publishedAt,
            });
        });
        ctx.body = {
            data: simplifiedData,
            meta: {
                pagination: {
                    page: Number(page),
                    pageSize: Number(pageSize),
                    total,
                    pageCount: Math.ceil(total / Number(pageSize)),
                },
            },
            message: "SUCCESS",
            status: 200,
        };
    },
    async getBySlug(ctx) {
        const { slug } = ctx.params;
        const entry = await strapi.entityService.findMany("api::knowledge-base.knowledge-base", {
            status: "published",
            filters: { Slug: slug },
            populate: {
                HeadingImage: true,
                Content: {
                    populate: {
                        ContentSection: true,
                    },
                },
                Category: true,
            },
        });
        if (entry.length === 0) {
            ctx.notFound("No data found");
            return;
        }
        console.log(entry);
        const simplifiedData = entry.map((entry) => {
            var _a, _b, _c, _d, _e, _f;
            return ({
                id: entry.id,
                title: entry.HeadingTitle,
                subtitle: entry.HeadingSubtitle,
                headingColor: entry.HeadingColor,
                slug: entry.Slug,
                category: (_a = entry.Category) === null || _a === void 0 ? void 0 : _a.map((category) => ({
                    id: category.id,
                    name: category.Category,
                    slug: category.Slug,
                })),
                headingImageUrl: ((_d = (_c = (_b = entry.HeadingImage) === null || _b === void 0 ? void 0 : _b.formats) === null || _c === void 0 ? void 0 : _c.medium) === null || _d === void 0 ? void 0 : _d.url) || ((_e = entry.HeadingImage) === null || _e === void 0 ? void 0 : _e.url),
                sections: (_f = entry.Content) === null || _f === void 0 ? void 0 : _f.map((section) => {
                    var _a;
                    return ({
                        sectionTitle: section.TitleSection,
                        content: (_a = section.ContentSection) === null || _a === void 0 ? void 0 : _a.filter((item) => (item === null || item === void 0 ? void 0 : item.Title) || (item === null || item === void 0 ? void 0 : item.Content)).map((item) => ({
                            title: item === null || item === void 0 ? void 0 : item.Title,
                            content: item === null || item === void 0 ? void 0 : item.Content,
                        })),
                    });
                }),
            });
        });
        ctx.body = {
            data: simplifiedData[0],
            message: "SUCCESS",
            status: 200,
        };
    },
    async getAllSlugs(ctx) {
        console.log("getAllData");
        const entries = await strapi.entityService.findMany("api::knowledge-base.knowledge-base", {
            status: "published",
            fields: ["Slug", "HeadingTitle", "publishedAt"],
            sort: { HeadingTitle: "asc" },
        });
        const result = entries.map((entry) => ({
            slug: entry.Slug,
            title: entry.HeadingTitle,
        }));
        ctx.body = {
            data: result,
            message: "SUCCESS",
            status: 200,
        };
    },
};
