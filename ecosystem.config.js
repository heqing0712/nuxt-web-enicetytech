
module.exports = {
    apps: [
      {
        name: 'Nuxt-web',
        exec_mode: 'cluster',
        instances: '1', // Or a number of instances
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start',
      },
    ],
  }