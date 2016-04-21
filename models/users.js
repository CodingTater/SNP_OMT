// const knex = require('../db/knex');
// const bcrypt = require('bcrypt');
// const SALT_WORK_FACTOR = 10;
//

//
// Users.createUser = (data, callback) => {
//   bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//     if (err) {
//       callback(err);
//     }
//
//     bcrypt.hash(data.password, salt, (err, hash) => {
//       if (err) {
//         callback(err);
//       }
//
//       data.pass_hash = hash;
//       delete data.password;
//       Users().insert(data, '*').then((data) => {
//         callback(undefined, data);
//       });
//     });
//   });
// }
//
// Users.authenticateUser = (admin) => {
//   Users().where({pass: req.user.pass}).first().then(user => {
//     if () {
//       return callback("You need to have admin clearance for this");
//     }
//     bcrypt.compare(password, user.pass_hash, (err, isMatch) => {
//       if (err || !isMatch) {
//         return callback("Email and password don't match");
//       } else {
//         return callback(undefined, user);
//       }
//     });
//   });
// }

// module.exports = Users;
