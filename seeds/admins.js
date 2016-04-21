exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({id: 1, name: 'Sean', pass_hash: '$2a$10$tSEvGeQYAa/4rvY4Fmx7BeAU9asU4RJEgnkE3ssJ12SAsES3XXGT2'}),
    knex('users').insert({id: 2, name: 'Kyle', pass_hash: '$2a$10$r1tRcU82XpNmzdnjLsqbmOXBLIE3YJNt1UDW7FgKCdaxjJR/jToi6'}),
    knex('users').insert({id: 3, name: 'Veronica', pass_hash: '$2a$10$tBx/VvPOOROg4GOrEYe.mOtkUoBAwsotrMVKCFQilG2Yo/P3CQEtG'}),
    knex('users').insert({id: 4, name: 'Alex', pass_hash: '$2a$10$tBx/VvPOOROg4GOrEYe.mOtkUoBAwsotrMVE3ssJ12SAsES3XXGT2'})

  );
};
