exports.up = function(knex, Promise) {
  return knex.schema.createTable('measures', function (table) {
    table.increments();
    table.integer('patient_id')
      .index()
      .references('id')
      .inTable('patients')
      .onDelete('cascade');
    table.date('initial_hra');
    table.integer('days_late_initial_hra')
    table.date('recent_hra');
    table.integer('days_late_recent_hra');
    table.date('initial_icp');
    table.integer('days_late_initial_icp')
    table.date('recent_icp');
    table.integer('days_late_recent_icp');
    table.date('c01_breast');
    table.date('c02_cancer');
    table.date('c03_flu_vac');
    table.date('c12_osteoporosis');
    table.date('c13_betus_eyecare');
    table.date('c14_betus_kidneycare');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('measures');
};
