/**
 * knowledge-base router
 */

export default {
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
