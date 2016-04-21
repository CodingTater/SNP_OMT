exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('name').notNullable();
    table.string('pass').notNullable().unique();
    table.string('email');
    table.boolean('admin').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
