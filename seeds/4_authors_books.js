
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('authors_books').del(),

    // Inserts seed entries
    knex('authors_books').insert({
        author_id: 1,
        book_id: 1
    }),
    knex('authors_books').insert({
        author_id: 2,
        book_id: 1
    }),
    knex('authors_books').insert({
        author_id: 3,
        book_id: 1
    }),
    knex('authors_books').insert({
        author_id: 4,
        book_id: 2
    }),
    knex('authors_books').insert({
        author_id: 5,
        book_id: 3
    }),
    knex('authors_books').insert({
        author_id: 6,
        book_id: 4
    }),
    knex('authors_books').insert({
        author_id: 6,
        book_id: 5
    }),
    knex('authors_books').insert({
        author_id: 6,
        book_id: 6
    })

  );
};
