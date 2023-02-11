module.exports = {
  apps: [
    {
      name: "Twitter",
      script: "./bin/www",
      watch: true,
      autorestart: true,
      instances: -1,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
