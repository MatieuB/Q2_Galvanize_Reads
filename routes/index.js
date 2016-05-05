var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var bookshelf = require('bookshelf')(knex);





/* GET home page. */
router.get('/',function(req,res,next){
    res.render('index')
})
// effing with Bookshelf.js
// router.get('/', function(req, res, next) {
//     var User = bookshelf.Model.extend({
//         tableName: 'authors',
//         post_id: function() {
//             return this.hasMany(Posts);
//         }
//     });
//     var Posts = bookshelf.Model.extend({
//         tableName: 'authors_books',
//         tag: function() {
//             return this.belongsToMany(Tag);
//         }
//     });
//     var Tag = bookshelf.Model.extend({
//         tableName: 'books'
//     });
//
//     User.where('id', 4).fetch({
//         withRelated: ['posts_id.tag']
//     }).then(function(user) {
//
//         console.log(user.related('posts').toJSON())
//         res.render('index', {
//             title: 'Galvanize Reads'
//         });
//     })
// });


router.get('/books', function(req, res, next) {
    var result = [];
    knex('books')
        .then(function(data) {
            for (var i = 0; i < data.length; i++) {
                result.push({
                    id: data[i].id,
                    title: data[i].title,
                    description: data[i].description,
                    cover_url: data[i].cover_url,
                    genre_id: data[i].genre_id,
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
                for (var j = 0; j < data.length; j++) {

                    console.log('-----datastringlogn--------', data[j].first_name);
                    if (result[i].id == data[j].book_id) {
                        result[i].authors.push(data[j].first_name + ' ' + data[j].last_name)
                    }
                }
            }
            res.render('books', {
                title: 'Galvanize Reads',
                book: result,
                authors: result
            })
        })
});


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
    var result = [];
    knex('authors')
        .where({
            id: req.params.id
        })
        .then(function(data) {
            for (var i = 0; i < data.length; i++) {
                result.push({
                    id: data[i].id,
                    first_name: data[i].first_name,
                    last_name: data[i].last_name,
                    bio: data[i].bio,
                    portrait_url: data[i].portrait_url,
                    books: []
                })
            }
        }).then(function() {

            knex('authors')
                .innerJoin('authors_books', 'authors.id', 'authors_books.author_id')
                .innerJoin('books', 'authors_books.book_id', 'books.id')
                .select('authors_books.author_id', 'books.title')
                .then(function(data) {
                    for (var i = 0; i < result.length; i++) {
                        for (var j = 0; j < data.length; j++) {
                            if (result[i].id == data[j].author_id) {
                                result[i].books.push(data[j].title)
                            }
                        }
                    }


                    res.render('editAuthor', {
                        title: 'Galvanize Reads',
                        author: result,
                        books: result


                    })

                })
        })
});


// router.get('/authors/edit/:id', function(req, res, next) {
//     knex('authors')
//         .where({
//             id: req.params.id
//         })
//
//     .then(function(authorData) {
//         console.log(authorData);
//         res.render('editAuthor', {
//             title: 'Galvanize Reads',
//             author: authorData
//         });
//     })
// });

//Edit book info
router.get('/books/edit/:id', function(req, res, next) {
    var result = [];
    knex('books')
        .where({
            id: req.params.id
        })
        .then(function(data) {
            for (var i = 0; i < data.length; i++) {
                result.push({
                    id: data[i].id,
                    title: data[i].title,
                    description: data[i].description,
                    cover_url: data[i].cover_url,
                    genre_id: data[i].genre_id,
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
                for (var j = 0; j < data.length; j++) {
                    if (result[i].id == data[j].book_id) {
                        result[i].authors.push(data[j].first_name + ' ' + data[j].last_name)
                    }
                }
            }
            res.render('editBook', {
                title: 'Galvanize Reads',
                book: result,
                authors: result
            })
        })
});

//submit changes to book book book edit
router.post('/books/edit/:id', function(req, res, next) {
    knex('books')
        .where({
            id: req.params.id
        })

    .update(req.body)
        .then(function() {
            res.redirect('/books')

        })
});

//submit changes to author edit
router.post('/authors/edit/:id', function(req, res, next) {
    knex('authors')
        .where({
            'authors.id': req.params.id
        })
        .update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            bio: req.body.bio,
            portrait_url: req.body.portrait_url
        })

    .then(function(data) {
        console.log('---data----', data);
        knex('books')
            .where({
                title: req.body.title
            })
            .innerJoin('authors_books', 'books.id', 'authors_books.book_id')
            .innerJoin('books', 'authors_books_book.id', 'books.id')
            .update({
                title: req.body.title
            })
            .then(function() {
                res.redirect('/authors')

            })
    });
})

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
router.post('/books/delete/:id', function(req, res, next) {
    knex('books')
        .where({
            id: req.params.id
        })
        .del()
        .then(function() {
            res.redirect('/books')
        });
});
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
router.post('/books/edit/:id', function(req, res, next) {
    knex('books')
        .where({
            id: req.params.id
        })
        .update()
        .then(function() {
            res.redirect('/books')
        });
});


module.exports = router;
