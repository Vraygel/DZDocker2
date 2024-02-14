const express = require('express');
const fs = require('fs');
const idBook = require('./getid')
const axios = require('axios');

const logger = require('./middleware/logger')

const error404 = require('./middleware/err-404')

const indexRouter = require('./routes/index')

app.use(express.json());

const downloadBook = require('./routes/books/download_book')
const uploadBook = require('./routes/books/upload_book')
const createBook = require('./routes/books/create')
const viewBook = require('./routes/books/view')
const updateBook = require('./routes/books/update')
const deleteBook = require('./routes/books/delete')

const counterBook = require('./routes/books/counter')


const { log } = require('console');

const app = express();

app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use(express.static('public'));


app.use(logger)
app.use('/', indexRouter)
app.use('/create', createBook)
app.use('/view', viewBook)
app.use('/update', updateBook);
app.use('/delete', deleteBook);
app.use('/counter', counterBook);


app.use(error404)

app.use('/api/books', downloadBook)
app.use('/api/books', uploadBook)

const PORT = process.env.PORT || 3000;
app.listen(PORT);
