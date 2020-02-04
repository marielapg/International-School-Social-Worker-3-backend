
exports.up = function(knex) {
    return knex.schema
    .table('admins', tbl => {
        tbl.string('type', 60)
    })
    .table('socialWorkers', tbl => {
        tbl.string('type', 60)
    })
};

exports.down = function(knex) {
    return knex.schema
    .table('socialWorkers', tbl => {
        tbl.dropColumn('type')
    })
    .table('admins', tbl => {
        tbl.dropColumn('type')
    })
};
