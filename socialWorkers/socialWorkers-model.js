const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove,
};

function add(user) {
    return db("socialWorkers")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}
function find() {
    return db("socialWorkers").select("id", "first_name", "last_name", "email", "phone", "organization");
}

function findBy(filter) {
    return db("socialWorkers")
        .select("id", "first_name", "last_name", "email", "phone", "organization", "password")
        .where(filter);
}

function findById(id) {
    return db("socialWorkers")
        .select("id", "first_name", "last_name", "email", "phone", "organization")
        .where({ id })
        .first();
}

function update(changes, id) {
    return db('socialWorkers')
      .where({ id })
      .update(changes)
      .select("id", "first_name", "last_name", "email", "phone", "organization");
  }

function remove(id) {
    return db('socialWorkers')
      .where('id', id)
      .del();
  }
