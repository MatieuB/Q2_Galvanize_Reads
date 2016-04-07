var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Galvanize Reads' });
});
router.get('/books', function(req, res, next) {
    knex('authors_books')
        .innerJoin('authors','authors_books.author_id','authors.id')
        .innerJoin('books','authors_books.books_id','books.id')
        .innerJoin('genres','books.genre_id','genres.id')
        .then(function(bookData){
            console.log(bookData);
            res.render('books', { title: 'Galvanize Reads',
        book:bookData });
        })
});
router.get('/authors', function(req, res, next) {
    knex('authors_books')
        .innerJoin('authors','authors_books.author_id','authors.id')
        .innerJoin('books','authors_books.books_id','books.id')
        .innerJoin('genres','books.genre_id','genres.id')
        .then(function(bookData){
            console.log(bookData);
            res.render('authors', { title: 'Galvanize Reads',
        book:bookData });
        })
});

module.exports = router;
