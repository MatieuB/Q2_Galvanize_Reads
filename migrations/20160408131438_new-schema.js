
exports.up = function(knex, Promise) {
    return knex.schema.createTable('authors', function (table) {
        table.increments();
        table.string('first_name');
        table.string('last_name');
        table.text('bio');
        table.string('portrait_url');
    })
    .createTable('genres', function (table) {
        table.increments();
        table.string('genre');
    })
    .createTable('books', function (table) {
        table.increments();
        table.string('title');
        table.text('description');
        table.string('cover_url');
        table.integer('genre_id').references('genres.id');
    })
    .createTable('authors_books', function (table) {
        table.integer('author_id').references('authors.id').onDelete('cascade').onUpdate('cascade');
        table.integer('book_id').references('books.id').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('authors')
        .dropTable('books')
        .dropTable('genres')
        .dropTable('authors_books');
};
