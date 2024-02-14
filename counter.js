const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 4000;

const counterBook = require('./routes/books/counter')



app.use('/counter', counterBook)



// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
