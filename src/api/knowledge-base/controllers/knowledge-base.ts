/**
 * knowledge-base controller
 */

export default {
  async customFindAll(ctx: any) {
    const {
      page = 1,
      pageSize = 3,
      sort = "latest",
      search = "",
      category,
    } = ctx.query;

    const pageNum = Number(page);
    const pageSizeNum = Number(pageSize);
    const start = (pageNum - 1) * pageSizeNum;

    const filters: any = {
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
              ContentSection: {
                populate: {
                  ButtonDownload: true,
                },
              },
            },
          },
          Category: true,
        },
      }),
      strapi.db.query("api::knowledge-base.knowledge-base").count({
        where: filters,
      }),
    ]);

    console.log(entries[0]?.Content[0]?.ContentSection);
    const simplifiedData = entries.map((entry: any) => ({
      id: entry.id,
      title: entry.HeadingTitle,
      subtitle: entry.HeadingSubtitle,
      slug: entry.HeadingTitle.toLowerCase().replace(/\s/g, "-"),
      category: entry.Category?.map((category: any) => ({
        id: category.id,
        name: category.Category,
        slug: category.Slug,
      })),
      headingImageUrl:
        entry.HeadingImage?.formats?.medium?.url || entry.HeadingImage?.url,
      headingColor: {
        isCustom: entry.HeadingBackgroundColorTemplate === "custom",
        value: entry.HeadingBackgroundColorTemplate,
        custom: entry.HeadingBackgroundColor,
      },
      sections: entry.Content?.map((section: any) => ({
        sectionTitle: section.TitleSection,
        content: section.ContentSection?.filter(
          (item: any) => item?.Title || item?.Content
        ).map((item: any) => ({
          title: item?.Title,
          content: item?.Content,
          downloadButtons: item?.ButtonDownload.map((btn) => ({
            url: btn.ButtonUrl,
            text: btn.ButtonText,
          })),
        })),
      })),
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
      publishedAt: entry.publishedAt,
    }));

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
  async getKnowledgeById(ctx: any) {
    const { id } = ctx.params;
    const entry: any[] = await strapi.entityService.findMany(
      "api::knowledge-base.knowledge-base",
      {
        status: "published",
        filters: { id },
        populate: {
          HeadingImage: true,
          Content: {
            populate: {
              ContentSection: {
                populate: {
                  ButtonDownload: true,
                },
              },
            },
          },
          Category: true,
        },
      }
    );
    if (entry.length === 0) {
      ctx.notFound("No data found");
      return;
    }

    const simplifiedData = entry.map((entry: any) => ({
      id: entry.id,
      title: entry.HeadingTitle,
      subtitle: entry.HeadingSubtitle,
      headingColor: {
        isCustom: entry.HeadingBackgroundColorTemplate === "custom",
        value: entry.HeadingBackgroundColorTemplate,
        custom: entry.HeadingBackgroundColor,
      },
      slug: entry.HeadingTitle.toLowerCase().replace(/\s/g, "-"),
      category: entry.Category?.map((category: any) => ({
        id: category.id,
        name: category.Category,
        slug: category.Slug,
      })),
      headingImageUrl:
        entry.HeadingImage?.formats?.medium?.url || entry.HeadingImage?.url,
      sections: entry.Content?.map((section: any) => ({
        sectionTitle: section.TitleSection,
        content: section.ContentSection?.filter(
          (item: any) => item?.Title || item?.Content
        ).map((item: any) => ({
          title: item?.Title,
          content: item?.Content,
          downloadButtons: item?.ButtonDownload.map((btn) => ({
            url: btn.ButtonUrl,
            text: btn.ButtonText,
          })),
        })),
      })),
    }));
    ctx.body = {
      data: simplifiedData[0],
      message: "SUCCESS",
      status: 200,
    };
  },
  async getKnowledgePreview(ctx) {
    console.log("asd");
    const entries: any[] = await strapi.entityService.findMany(
      "api::knowledge-base.knowledge-base",
      {
        status: "draft",
        populate: {
          HeadingImage: true,
          Content: {
            populate: {
              ContentSection: {
                populate: {
                  ButtonDownload: true,
                },
              },
            },
          },
          Category: true,
        },
      }
    );

    console.log(entries);
    const simplifiedData = entries.map((entry: any) => ({
      id: entry.id,
      title: entry.HeadingTitle,
      subtitle: entry.HeadingSubtitle,
      slug: entry.HeadingTitle.toLowerCase().replace(/\s/g, "-"),
      category: entry.Category?.map((category: any) => ({
        id: category.id,
        name: category.Category,
        slug: category.Slug,
      })),
      headingImageUrl:
        entry.HeadingImage?.formats?.medium?.url || entry.HeadingImage?.url,
      headingColor: {
        isCustom: entry.HeadingBackgroundColorTemplate === "custom",
        value: entry.HeadingBackgroundColorTemplate,
        custom: entry.HeadingBackgroundColor,
      },
      sections: entry.Content?.map((section: any) => ({
        sectionTitle: section.TitleSection,
        content: section.ContentSection?.filter(
          (item: any) => item?.Title || item?.Content
        ).map((item: any) => ({
          title: item?.Title,
          content: item?.Content,
          downloadButtons: item?.ButtonDownload.map((btn) => ({
            url: btn.ButtonUrl,
            text: btn.ButtonText,
          })),
        })),
      })),
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
      publishedAt: entry.publishedAt,
    }));

    ctx.body = {
      data: simplifiedData,
      message: "SUCCESS",
      status: 200,
    };
  },
};
