import { mkdir, writeFile, readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.join(__dirname, '../../data')
const DATA_PATH = path.join(DATA_DIR, 'expenses.json')

let expensesCache = []

async function initializeCache() {
    try {
        await mkdir(DATA_DIR, { recursive: true })

        try {
        const data = await readFile(DATA_PATH, 'utf8')
        expensesCache = JSON.parse(data)
    } catch {
        expensesCache = []
        await saveToFile()
    }
    } catch (error) {
        console.log('Error initializing the storage', error)
        throw error
    }
}

async function saveToFile() {
    await writeFile(DATA_PATH, JSON.stringify(expensesCache, null, 2))
}

export async function addExpense(description, amount) {
    await initializeCache()

    const expense = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        description,
        amount: parseFloat(amount)
    }

    expensesCache.push(expense)
    await saveToFile()
    return expense
}
 