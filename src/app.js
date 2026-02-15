import express from 'express'
const expensesRoutes = require('./routes/expenses.routes.js')
const app = express()
app.use(express.json())

app.use('/expenses', expensesRoutes)

app.listen(3000, () => {
    console.log("Server is running!")
})