exports.up = function(knex, Promise) {
  return knex.schema.createTable('measures', function (table) {
    table.increments();
    table.integer('patient_id')
      .index()
      .references('id')
      .inTable('patients')
      .onDelete('cascade');
    table.date('initial_hra').nullable();
    table.integer('days_late_initial_hra');
    table.date('recent_hra').nullable();
    table.integer('days_late_recent_hra');
    table.date('initial_icp').nullable();
    table.integer('days_late_initial_icp')
    table.date('recent_icp').nullable();
    table.integer('days_late_recent_icp');
    table.date('c01_breast').nullable();
    table.date('c02_cancer').nullable();
    table.date('c03_flu_vac').nullable();
    table.date('c12_osteoporosis').nullable();
    table.date('c13_betus_eyecare').nullable();
    table.date('c14_betus_kidneycare').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('measures');
};
