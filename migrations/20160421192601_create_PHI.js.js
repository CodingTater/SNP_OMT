exports.up = function(knex, Promise) {
  return knex.schema.createTable('patients', function (table) {
    table.increments('id');
    table.text('last');
    table.text('first');
    table.text('gender').notNullable();
    table.integer('age');
    table.text('pcp');
    table.date('enrollment').notNullable();
    table.date('disenrollment').nullable();
    table.boolean('diabetes').defaultTo(false);
    table.boolean('osteoporosis').defaultTo(false);
    table.boolean('cancer').defaultTo(false);
    table.boolean('copd').defaultTo(false);
    table.boolean('esrd').defaultTo(false);
    table.boolean('heart').defaultTo(false);
    table.boolean('fracture').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('patients');
};
