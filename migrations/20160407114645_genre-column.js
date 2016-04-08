
exports.up = function(knex, Promise) {
    return knex.schema.table('books', function(table){
      table.integer('genre_id');
  });


};

exports.down = function(knex, Promise) {
    return knex.schema.table('books', function(table){
      table.dropColumn('genre_id');
  });


};