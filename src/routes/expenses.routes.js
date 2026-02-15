import { Router } from 'express'
import * as expensesController from '../controllers/expenses.controller.js'

const router = Router()

router.post('/', expensesController.create)

router.get('/', expensesController.list)

export default router