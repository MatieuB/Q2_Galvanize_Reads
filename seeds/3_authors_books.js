
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('authors_books').del(),

    // Inserts seed entries
    knex('authors_books').insert({
        id: 1, author_id: 1,
        books_id: 1
    }),
    knex('authors_books').insert({
        id: 2, author_id: 2,
        books_id: 1
    }),
    knex('authors_books').insert({
        id: 3, author_id: 3,
        books_id: 1
    }),
    knex('authors_books').insert({
        id: 4, author_id: 4,
        books_id: 2
    }),
    knex('authors_books').insert({
        id: 5, author_id: 5,
        books_id: 3
    }),
    knex('authors_books').insert({
        id: 6, author_id: 6,
        books_id: 4
    }),
    knex('authors_books').insert({
        id: 7, author_id: 6,
        books_id: 5
    }),
    knex('authors_books').insert({
        id: 8, author_id: 6,
        books_id: 6
    })

  );
};
