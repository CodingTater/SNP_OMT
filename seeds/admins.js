exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({ name: 'Alex Votry', pass: 'N67kZMIFMf', email: 'alex@someplace.net', admin: true }),
    knex('users').insert({ name: 'Joe Friel', pass:  'N67lPFWQNy', email: 'joe@someplace.net', admin: false }),
    knex('users').insert({ name: 'Sara Johnson', pass: 'P36qLMNOPb', email: 'sara@someplace.net', admin: false }),
    knex('users').insert({ name: 'Connie Chung', pass: 'B45uRABINt', email: 'connie@someplace.net', admin: false })
  );
};
