const express = require('express');
const router = express.Router();
const fs = require('fs');



// Обработчик POST-запроса для увеличения счетчика
app.post('/:bookId/incr', async (req, res) => {
	const bookId = req.params.bookId;
	try {
			// Получаем текущее значение счетчика
			let counter = 0;
			try {
					const data = await fs.readFile(`./counters/${bookId}.txt`, 'utf-8');
					counter = parseInt(data);
			} catch (error) {
					if (error.code !== 'ENOENT') {
							throw error;
					}
			}
			
			// Увеличиваем значение счетчика и сохраняем его
			counter++;
			await fs.writeFile(`./counters/${bookId}.txt`, counter.toString());

			res.status(200).send('Счетчик успешно увеличен');
	} catch (error) {
			console.error(error);
			res.status(500).send('Произошла ошибка при увеличении счетчика');
	}
});

app.post('/:bookId/incr', async (req, res) => {
	const bookId = req.params.bookId;
	try {
			await axios.post(`http://counter-service:4000/counter/${bookId}/incr`);
			res.status(200).send('Счетчик успешно увеличен');
	} catch (error) {
			console.error(error);
			res.status(500).send('Произошла ошибка при увеличении счетчика');
	}
});

app.get('/:bookId', async (req, res) => {
	const bookId = req.params.bookId;
	try {
			const response = await axios.get(`http://counter-service:4000/counter/${bookId}`);
			res.status(200).send(`Значение счетчика просмотров книги ${bookId}: ${response.data.counter}`);
	} catch (error) {
			console.error(error);
			res.status(500).send('Произошла ошибка при получении значения счетчика');
	}
});

// GET-маршрут для получения значения счетчика
app.get('/:bookId', async (req, res) => {
	const bookId = req.params.bookId;
	try {
			const data = await fs.readFile(`./counters/${bookId}.txt`, 'utf-8');
			const counter = parseInt(data);
			res.status(200).json({ counter });
	} catch (error) {
			if (error.code === 'ENOENT') {
					res.status(404).send('Счетчик не найден');
			} else {
					console.error(error);
					res.status(500).send('Произошла ошибка при получении значения счетчика');
			}
	}
});

module.exports = router;
