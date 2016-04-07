
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('genres').del(),

    // Inserts seed entries
    knex('genres').insert({id: 1, genre: 'Python'}),
    knex('genres').insert({id: 2, genre: 'JavaScript'}),
    knex('genres').insert({id: 3, genre: 'Design'}),
    knex('genres').insert({id: 4, genre: 'Databases'}),
    knex('genres').insert({id: 5, genre: 'Funsies'})

  );
};
