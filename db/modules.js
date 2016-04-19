const knex = require('./knex');

module.exports = {
  patients: function patents() {
    return knex('books');
  },
  measures: function measures() {
    return knex('authors');
  }

}
