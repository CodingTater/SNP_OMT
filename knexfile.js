module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/SNP_OMT',
    debug: true
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }

};
