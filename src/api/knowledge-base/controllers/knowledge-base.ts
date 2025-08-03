/**
 * knowledge-base controller
 */

export default {
  async customFindAll(ctx: any) {
    const entries = await strapi.entityService.findMany(
      "api::knowledge-base.knowledge-base",
      {
        status: "published",
        populate: {
          HeadingImage: true,
          Content: {
            populate: {
              ContentSection: true,
            },
          },
          Category: true,
        },
      }
    );

    const simplifiedData = entries.map((entry: any) => ({
      id: entry.id,
      title: entry.HeadingTitle,
      subtitle: entry.HeadingSubtitle,
      slug: entry.Slug,
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
        })),
      })),
    }));

    ctx.body = {
      data: simplifiedData,
      message: "SUCCESS",
      status: 200,
    };
  },
  async getBySlug(ctx: any) {
    const { slug } = ctx.params;
    const entry: any[] = await strapi.entityService.findMany(
      "api::knowledge-base.knowledge-base",
      {
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
      slug: entry.Slug,
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
        })),
      })),
    }));
    ctx.body = {
      data: simplifiedData[0],
      message: "SUCCESS",
      status: 200,
    };
  },
  async getAllSlugs(ctx: any) {
    console.log("getAllData");
    const entries = await strapi.entityService.findMany(
      "api::knowledge-base.knowledge-base",
      {
        status: "published",
        fields: ["Slug", "HeadingTitle", "publishedAt"],
        sort: { HeadingTitle: "asc" },
      }
    );

    const result = entries.map((entry: any) => ({
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
