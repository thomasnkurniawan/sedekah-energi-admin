// config/plugins.ts

import type { Config as GenericCustomFieldsConfig } from "strapi-plugin-generic-custom-fields/dist/server/src/config";
/**
 * #023C40
#035A60
#6EA85E
#F35B3D
#FCC431
 */
const categories = [
  { value: "custom", label: "Custom" },
  { value: "#023C40", label: "Dark Green" },
  { value: "#035A60", label: "Green" },
  { value: "#6EA85E", label: "Light Green" },
  { value: "#F35B3D", label: "Orange" },
  { value: "#FCC431", label: "Yellow" },
];
export default () => ({
  "generic-custom-fields": {
    enabled: true,
    config: {
      customFields: [
        {
          name: "Color Pallete",
          description: "Select a Color Pallete or Pick Custom",
          icon: "Palette",
          fetchItems: () => ({ items: categories }),
          fetchItem: ({ value }) =>
            categories.find((category) => category.value === value),
        },
      ],
    } satisfies GenericCustomFieldsConfig,
  },
});
