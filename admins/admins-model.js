const db = require('../database/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove,
    findStudents,
    addStudent
};
function add(user) {
    return db("admins")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}
function find() {
    return db("admins").select("id", "first_name", "last_name", "email", "phone", "organization");
}

function findBy(filter) {
    return db("admins")
        .select("id", "first_name", "last_name", "email", "phone", "organization", "password")
        .where(filter);
}

function findById(id) {
    return db("admins")
        .select("id", "first_name", "last_name", "email", "phone", "organization")
        .where({ id })
        .first();
}

function update(changes, id) {
    return db('admins')
      .where({ id })
      .update(changes)
      .select("id", "first_name", "last_name", "email", "phone", "organization");
  }

function remove(id) {
    return db('admins')
      .where('id', id)
      .del();
  }

function findStudents(id) {
    return db('students as stds')
        .join('admins as admn', 'admn.id', 'stds.admin_id')
        .select('stds.*')
        .where('stds.admin_id', id)
        .orderBy('stds.id');
}

function addStudent(studentData, id) {
    const newStudent = {...studentData, admin_id: id}
    return db('students')
        .insert(newStudent)
        .then(() => {
            return findStudents(id)});
}
