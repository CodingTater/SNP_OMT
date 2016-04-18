exports.up = function(knex, Promise) {
  return knex.schema.createTable('measures', function (table) {
    table.increments();
    table.integer('patient_id')
      .index()
      .references('id')
      .inTable('patients')
      .onDelete('cascade');
    table.date('initialHRA');
    table.integer('daysLateInitialHRA')
    table.date('recentHRA');
    table.integer('daysLateRecentHRA');
    table.date('initialICP');
    table.integer('daysLateInitialICP')
    table.date('recentICP');
    table.integer('daysLateRecentICP');
    table.date('C01Breast');
    table.date('C02Cancer');
    table.date('C03FluVac');
    table.date('C12Osteoporosis');
    table.date('C13BetusEyeCare');
    table.date('C14BetusKidneyCare');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('measures');
};
