module.exports = {
  apps: [
    {
      name: "strapi-admin", // <-- Nama ini yang akan muncul di 'pm2 list'
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
