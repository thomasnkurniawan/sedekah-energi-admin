import customRoutes from './knowledge-base';

export default {
  type: 'content-api',
  routes: [
    ...customRoutes.routes,
  ],
};