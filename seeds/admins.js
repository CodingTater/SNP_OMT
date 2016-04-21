exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({ name: 'Alex Votry', pass: 'N67kZMIFMf', email: 'alex@someplace.net', photo: 'https://media.licdn.com/mpr/mprx/0_GlrRkytfTVdFpI0dIlQRifhfTodFMsGXwhevTdzaXadQpEPewlo9EmUfGosFMI85ahoRWJ47egE6VYb5wGzFueJ_DgEbVYcewGz4bW2m6yxIre2qFP_nFjGxSHKBPY8MGTlchRahvPf', admin: true }),
    knex('users').insert({ name: 'Joe Friel', pass:  'N67lPFWQNy', email: 'joe@someplace.net', photo: 'https://images-na.ssl-images-amazon.com/images/I/21fLHW+MjvL._UX250_.jpg', admin: false }),
    knex('users').insert({ name: 'Sara Johnson', pass: 'P36qLMNOPb', email: 'sara@someplace.net', photo: 'http://www.bighatt.com/wp-content/uploads/2014/04/Sara_003_RGB-1.jpg', admin: false }),
    knex('users').insert({ name: 'Connie Chung', pass: 'B45uRABINt', email: 'connie@someplace.net', photo: 'http://media.npr.org/assets/img/2011/06/08/2011_06_08---2008_-connie-chung_custom-8cf93f99086c1e24222f0dfa5261978e51cc0337-s300-c85.jpg', admin: false })
  );
};
