var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Galvanize Reads'
    });
});
router.get('/books', function(req, res, next) {
    var result = [];
    knex('books')
        .orderBy('title')
        .then(function(data) {
            for (var i = 0; i < data.length; i++) {
                result.push({
                    id: books[i].title,
                    description: books[i].description,
                    cover_url: books[i].cover_url,
                    genre_id: books[i].genre_id,
                    authors: []
                })
            }
        })
    return knex('books')
        .innerJoin('authors_books', 'books.id', 'authors_books.book_id')
        .innerJoin('authors', 'authors_books.author_id', 'authors.id')
        .select('authors_books.book_id', 'authors.first_name', 'authors.last_name')
        .then(function(data) {
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < books.length; j++) {
                    if (result[i].id == data[j].book_id) {
                        result[i].authors.push(data[j].first_name + ' ' + data[j].last_name)
                    }
                }
            }
            res.render('books', {
                result: books,
                authors: books
            })
        })


});

//knex('first_name', 'last_name', 'book_id', 'author_id').from('authors')
    //.innerJoin('authors_books', 'authors.id', 'authors_books.author_id')
    // .pluck('authors_books.author_id')
    // .whereIn('authors.id','authors_books.author_id')

//.innerJoin('books', 'authors_books.book_id', 'books.id')
    // .then(function(bookId){
    //     result.bookId=bookId;
    //     console.log('=======result======',result)
    //
    // }).then(function(){
    //     knex('books')
    // .innerJoin('genres', 'books.genre_id', 'genres.id')
    // .then(function(book) {
    //     console.log('--------book===========', book);
    //     res.render('books', {
    //         title: 'Galvanize Reads',
    //         book: book
    //     })
    // })


// })

//})

//List all books
// router.get('/books', function(req, res, next) {
//     var result = {};
//     knex('books')
//         // .innerJoin('authors_books','books.id','authors_books.book_id')
//         // .innerJoin('authors','authors_books.author_id','authors.id')
//     .then(function(books) {
//         result.books = books;
//     }).then(function() {
//         knex('authors')
//         .then(function(authors) {
//         result.authors = authors;
//         })
//     }).then(function(){
//         console.log('======result.books=======',result.books);
//         console.log('======result=======',result);
//         res.render('books',{title:'Galvanize Reads',book:result.books,
//         author:result.authors})
//     })
// })

////start back here!
// .innerJoin('books','authors_books.book_id','books.id')
// // .innerJoin('books','authors_books.book_id','books.id')
// .whereIn('')
// .innerJoin('authors','authors_books.author_id','authors.id')
// .innerJoin('genres','books.genre_id','genres.id')
// .then(function(bookData){
//     console.log('======booksssData======',bookData);
//     res.render('books', { title:'Galvanize Reads',
// book:bookData });
// })
//});
//create new author
router.get('/authors/new', function(req, res, next) {
        res.render('newAuthor', {
            title: 'Galvanize Reads'
        })
    })
    //post new author to DB
router.post('/authors/new', function(req, res, next) {
        knex('authors')
            .insert({
                // req.body
                // id:'default',
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                bio: req.body.bio,
                portrait_url: req.body.portrait_url
            })
            .then(function() {
                res.redirect('/authors')
            })
    })
    //create new book
router.get('/books/new', function(req, res, next) {
        res.render('newBook', {
            title: 'Galvanize Reads'
        })
    })
    //post new author to DB
router.post('/books/new', function(req, res, next) {
    knex('books')
        .insert({
            // id:'defualt',
            title: req.body.title,
            description: req.body.description,
            cover_url: req.body.cover_url
        })
        .then(function() {
            res.redirect('/books')
        })
})


// router.get('/orders/:id', function(req, res, next) {
//   var data = {};
//
//   knex('orders')
//   .where({'order_id': req.params.id})
//   .innerJoin('users', 'orders.user_id','users.user_id')
//   .first()
//   .then(function(results) {
//     data.customer_name = results.user_name;
//     data.order_date = results.created_at;
//     knex('orders_products as OP')
//     .select('P.product_name as name')
//     .count('P.product_name as count')
//     .groupBy('name')
//     .orderBy('name','asc')
//     .where({'order_id': req.params.id})
//     .innerJoin('products as P','OP.product_id', 'P.product_id')
//     .then(function (results) {
//       data.items = results;
//       console.log(data);
//       res.render('index',{data:data});
//     });
//   });
// });

//List all Authors
router.get('/authors', function(req, res, next) {
    knex('authors')
        .then(function(bookData) {
            console.log(bookData);
            res.render('authors', {
                title: 'Galvanize Reads',
                book: bookData
            });
        })
});

//Edit Author info
router.get('/authors/edit/:id', function(req, res, next) {
    knex('authors')
        .where({
            id: req.params.id
        })

    .then(function(authorData) {
        console.log(authorData);
        res.render('editAuthor', {
            title: 'Galvanize Reads',
            author: authorData
        });
    })
});

//Edit book info...not wired right
router.get('/books/edit/:id', function(req, res, next) {
    knex('books')
        .where({
            id: req.params.id
        })
        // .innerJoin('authors_books','books.id','authors_books.book_id')
        // .innerJoin('authors','authors_books.author_id','authors.id')

    .then(function(bookData) {
        console.log('======bookData=======', bookData);
        res.render('editBook', {
            title: 'Galvanize Reads',
            book: bookData
        });
    })
});

//submit changes to author edit
router.post('/authors/edit/:id', function(req, res, next) {
    knex('authors')
        .where({
            id: req.params.id
        })
        .update(req.body)
        .then(function() {
            res.redirect('/authors')

        })
});

//Delete page for books
router.get('/books/delete/:id', function(req, res, next) {
    knex('books')
        .where({
            id: req.params.id
        })
        .then(function(bookData) {
            console.log(bookData);
            res.render('deleteBook', {
                title: 'Galvanize Reads',
                book: bookData
            });
        });
});

//delete a book
// router.post('/books/delete/:id',function(req,res,next){
//     knex('books')
//         .where({id:req.params.id})
//         .del()
//         .then(function(){
//         res.redirect('/books')
//     });
// });
//Delete page for authors
router.get('/authors/delete/:id', function(req, res, next) {
    knex('authors')
        .where({
            id: req.params.id
        })

    .then(function(authorData) {
        console.log(authorData);
        res.render('deleteAuthor', {
            title: 'Galvanize Reads',
            author: authorData
        });

    });
});
//Delete An Author!
router.post('/authors/delete/:id', function(req, res, next) {
    knex('authors')
        .where({
            id: req.params.id
        })
        .del()
        .then(function() {
            res.redirect('/authors')
        });
});


module.exports = router;
