const knex = require('knex')('production');
 const config = require('../knexfile.js');

 const environment = process.env.DB_ENV || 'production';

 module.exports = require('knex')('production');