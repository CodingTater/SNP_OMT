module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/SNP_OMT'
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }

};
