exports.up = function(knex, Promise) {
  return knex.schema.createTable('patients', function (table) {
    table.increments('id');
    table.text('last');
    table.text('first');
    table.text('gender').notNullable();
    table.integer('age');
    table.text('patientId').notNullable();
    table.text('pcp');
    table.text('planType');
    table.date('enrollment').notNullable();
    table.date('disenrollment');
    table.boolean('diabetes');
    table.boolean('osteoporosis');
    table.boolean('cancer');
    table.boolean('copd');
    table.boolean('esrd');
    table.boolean('heartDisease');
    table.boolean('fracture');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('patients');
};
