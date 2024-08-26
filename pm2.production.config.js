module.exports = {
  apps: [
    {
      name: 'hidory',
      script: 'node_modules/next/dist/bin/next',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '4096M',
      args: 'start',
      increment_var: 'PORT',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
