
exports.up = function(knex) {
    return knex.schema.createTable('socialWorkers', socialWorkers => {
        socialWorkers.increments();
        socialWorkers.string('first_name', 235).notNullable();
        socialWorkers.string('last_name', 235).notNullable();
        socialWorkers.string('email', 235).notNullable().unique();
        socialWorkers.string('phone', 25);
        socialWorkers.string('organization', 235);
        socialWorkers.string('password', 235).notNullable();;
      
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('socialWorkers');

};
