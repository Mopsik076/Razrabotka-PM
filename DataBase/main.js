require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pool = require('./db');
const bcrypt = require('bcryptjs');
const cors = require('cors');

app.use(express.json()); // обработка JSON тела запросов
app.use(cors()); // разрешаем CORS

// Импортируем контроллеры
const authController = require('./controllers/auth.controller');
const expensesController = require('./controllers/expenses.controller');

// Роуты
app.use('/auth', authController);
app.use('/expenses', expensesController);

// старт сервера
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
