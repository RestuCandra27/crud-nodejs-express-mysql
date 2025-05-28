var express = require('express');
var router = express.Router();

// Import database connection
var connection = require('../library/database');
const { param } = require('.');

router.get('/', function(req, res, next) {

    // Query to get all posts
    connection.query('SELECT * FROM tbl_41_post', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('posts', {
                data: ''
            });
        } else {
            //render ke view posts index
            res.render('posts/index', { 
                data: rows//<--data posts
            });
        }
    });
});

//create post
router.get('/create', function(req, res, next) {
    //render ke view posts create
    res.render('posts/create', {
        title: 'Create Post',
        title: '',
        content: ''
    })
})

router.post('/store', function(req, res, next) {
    let title = req.body.title;
    let content = req.body.content;
    let errors = false;

    if(title.length === 0) {
        errors = true;
        req.flash('error', "Silahkan masukan title");
        res.render('posts/create', {
            title: title,
            content: content
        })
    }

    if(content.length === 0) {
        errors = true;
        req.flash('error', "Silahkan masukan content");
        res.render('posts/create', {
            title: title,
            content: content
        })
    }

    //if no errors
    if(!errors) {

        let formData ={
            title: title,
            content: content
        }
        //insert query
        connection.query('INSERT INTO tbl_41_post SET ?', formData, function(err, result) {
            if(err) {
                req.flash('error', err);
                res.render('posts/create', {
                    title: formData.title,
                    content: formData.content
                })
            } else {
                req.flash('success', 'Data berhasil disimpan');
                res.redirect('/posts');
            }
        })
    }
})

//EDIT post
router.get  ('/edit/(:id)', function(req, res, next) {
    let id = req.params.id;

    connection.query('SELECT * FROM tbl_41_post WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err

        if (rows.length < 0) {
            req.flash('error', 'Data Post dengan ID' + id + ' tidak ditemukan');
            res.redirect('/posts');
        }

        else {
            res.render('posts/edit', {
                id:         rows[0].id,
                title:      rows[0].title,
                content:    rows[0].content
            })
        }
    })
})

//update post
router.post('/update/:id', function(req, res, next) {
    let id = req.params.id;
    let title = req.body.title;
    let content = req.body.content;
    let errors = false;

    if(title.length === 0) {
        errors = true;
        req.flash('error', "Silahkan masukan title");
        res.render('posts/edit', {
            id:         req.params.id,
            title:      title,
            content:    content
        })
    }

    if(content.length === 0) {
        errors = true;
        req.flash('error', "Silahkan masukan content");
        res.render('posts/edit', {
            id: req.params.id,
            title: title,
            content: content
        })
    }
    if(!errors) {

        let formData = {
            title: title,
            content: content
        }

        //update query
        connection.query('UPDATE tbl_41_post SET ? WHERE id = ' + id, formData, function(err, result) {
            if(err) {
                req.flash('error', err);
                res.render('posts/edit', {
                    id: req.params.id,
                    title: formData.title,
                    content: formData.content
                })
            } else {
                req.flash('success', 'Data berhasil diupdate');
                res.redirect('/posts');
            }
        })
    }
})

//delete post
router.get('/delete/(:id)', function(req, res, next) {
    let id = req.params.id;

    connection.query('DELETE FROM tbl_41_post WHERE id = ' + id, function(err, result) {
        if(err) {
            req.flash('error', err);
            res.redirect('/posts');
        } else {
            req.flash('success', 'Data berhasil dihapus');
            res.redirect('/posts');
        }
    })
})  

module.exports = router;