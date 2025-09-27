const pool = require('../db');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query('INSERT INTO users(username, password_hash) VALUES($1, $2) RETURNING *', [username, hashedPassword]);
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
        if (user.rowCount === 0) return res.status(401).json({ message: 'Пользователь не найден.' });
        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) return res.status(401).json({ message: 'Неверный пароль.' });
        res.json({ message: 'Авторизация успешна.', user: user.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};