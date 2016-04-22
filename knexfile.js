module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/snp_omt',
    debug: true
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }

};
