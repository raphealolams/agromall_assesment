module.exports = {
  apps: [
    {
      name: "client",
      cwd: "./",
      script: "npm",
      args: "start",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
