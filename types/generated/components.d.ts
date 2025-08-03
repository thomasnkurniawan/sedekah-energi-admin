import type { Schema, Struct } from '@strapi/strapi';

export interface KnowledgeBaseContent extends Struct.ComponentSchema {
  collectionName: 'components_knowledge_base_contents';
  info: {
    displayName: 'content';
    icon: 'book';
  };
  attributes: {
    Content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    Title: Schema.Attribute.String;
  };
}

export interface KnowledgeBaseKnowlegeContent extends Struct.ComponentSchema {
  collectionName: 'components_knowledge_base_knowlege_contents';
  info: {
    displayName: 'knowlege_content';
    icon: 'quote';
  };
  attributes: {
    ContentSection: Schema.Attribute.Component<'knowledge-base.content', true>;
    TitleSection: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'knowledge-base.content': KnowledgeBaseContent;
      'knowledge-base.knowlege-content': KnowledgeBaseKnowlegeContent;
    }
  }
}
