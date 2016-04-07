
exports.up = function(knex, Promise) {
    return knex.schema.table('books', function(table){
      table.dropColumn('author_id');
      table.integer('author1_id');
      table.integer('author2_id');
      table.integer('author3_id');
  });


};

exports.down = function(knex, Promise) {
    return knex.schema.table('books', function(table){
      table.integer('author_id').references('genres.id');
      table.dropColumn('author1_id');
      table.dropColumn('author2_id');
      table.dropColumn('author3_id');
  });

};
