const pool = require('../db');

exports.getAllExpensesByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const allExpenses = await pool.query('SELECT * FROM transactions WHERE user_id=$1 AND category=\'expense\' ORDER BY date DESC', [user_id]);
        res.json(allExpenses.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.addExpense = async (req, res) => {
    try {
        const { user_id, category, sum, date } = req.body;
        const newTransaction = await pool.query('INSERT INTO transactions(category, sum, date, user_id) VALUES($1, $2, $3, $4) RETURNING *', ['expense', sum, date, user_id]);
        res.status(201).json(newTransaction.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { expenseID, newSum } = req.body;
        const updatedRow = await pool.query('UPDATE transactions SET sum=$1 WHERE transaction_id=$2 RETURNING *', [newSum, expenseID]);
        res.json(updatedRow.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { expenseID } = req.body;
        await pool.query('DELETE FROM transactions WHERE transaction_id=$1', [expenseID]);
        res.json({ message: 'Расход удалён успешно.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};