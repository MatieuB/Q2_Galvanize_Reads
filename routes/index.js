var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Galvanize Reads' });
});

//List all books
router.get('/books', function(req, res, next) {
    knex('books')
        // .innerJoin('authors','authors_books.author_id','authors.id')
        // .innerJoin('books','authors_books.books_id','books.id')
        .innerJoin('authors','books.author1_id','authors.id')

        .innerJoin('genres','books.genre_id','genres.id')
        .then(function(bookData){
            console.log(bookData);
            res.render('books', { title:'Galvanize Reads',
        book:bookData });
        })
});

//List all Authors
router.get('/authors', function(req, res, next) {
    knex('authors')
        .then(function(bookData){
            console.log(bookData);
            res.render('authors', { title:'Galvanize Reads',
        book:bookData });
        })
});

//Edit Author info
router.get('/authors/edit/:id', function(req, res, next) {
    knex('authors')
        .where({id:req.params.id})

        .then(function(authorData){
            console.log(authorData);
            res.render('editAuthor', { title:'Galvanize Reads',
        author:authorData });
        })
});

//Edit book info...not wired right
router.get('/books/edit/:id', function(req, res, next) {
    knex('books')
        .where({id:req.params.id})
        // .innerJoin('authors_books','books.id','authors_books.books_id')
        // .innerJoin('authors','authors_books.author_id','authors.id')

        .then(function(bookData){
            console.log(bookData);
            res.render('editBook', { title:'Galvanize Reads',
        book:bookData });
        })
});

//submit changes to author edit
router.post('/authors/edit/:id', function(req, res, next) {
    knex('authors')
        .where({id:req.params.id})
        .update(req.body)
        .then(function(){
            res.redirect('/authors')

        })
});

//Delete page for authors
router.get('/authors/delete/:id',function(req,res,next){
    knex('authors')
        .where({id:req.params.id})

        .then(function(authorData){
            console.log(authorData);
            res.render('deleteAuthor', { title:'Galvanize Reads',
        author:authorData });

    });
});
//Delete An Author!
// router.post('/authors/delete/:id',function(req,res,next){
//     knex('authors')
//         .where({id:req.params.id})
//         .del()
//         .then(function(){
//         res.redirect('/authors')
//     });
// });


module.exports = router;
