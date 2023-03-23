module.exports = {
  apps: [{
    name: 'backend_doban',
    script: 'yarn',
    args: 'start',
    watch: true,
    env: {
      NODE_ENV: "production",
      PORT: 5000    
    }
  }]
};

