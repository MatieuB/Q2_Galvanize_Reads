
exports.up = function(knex, Promise) {
    return knex.schema.table('books', function(table){
        table.dropColumn('cover-url');
        table.string('cover_url');
  });

};

exports.down = function(knex, Promise) {
    return knex.schema.table('books', function(table){
      table.dropColumn('cover_url');
      table.string('cover-url');
  });

};
