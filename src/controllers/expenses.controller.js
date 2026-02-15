import * as expensesService from '../services/expenses.service.js'

export async function create(req, res) {
    try {
        const { description, amount } = req.body
        if (!description || !amount || amount <= 0) {
            return res.status(400).json({ error: "Description and amount > 0 are required"})
        }
        const expense = await expensesService.addExpense(description, amount)
        res.status(201).json(expense)
    } catch (error) {
        res.status(500).json({ error: 'Intern Error'})
    }
}