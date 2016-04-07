
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', function (table) {
    table.increments();
    table.string('title');
    table.text('description');
    table.string('cover-url');
    table.integer('author_id');
  });

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('books');

};
