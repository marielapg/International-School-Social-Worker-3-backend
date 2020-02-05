
exports.up = function(knex) {
    return knex.schema.createTable('admins', Admins => {
        Admins.increments();
        Admins.string('first_name', 235).notNullable();
        Admins.string('last_name', 235).notNullable();
        Admins.string('email', 235).notNullable().unique();
        Admins.string('phone', 25);
        Admins.string('organization', 235);
        Admins.string('password', 235).notNullable();
        Admins.string('type', 60).notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('admins');
};
