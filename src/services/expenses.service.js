import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_PATH = path.join(__dirname, '../data/expenses.json')

let expensesCache = []

async function initializeCache() {
    try {
        const data = await readFile(DATA_PATH, 'utf8')
        expensesCache = JSON.parse(data)
    } catch {
        expensesCache = []
        await saveToFile()
    }
}

async function saveToFile() {
    await writeFile(DATA_PATH, JSON.stringify(expensesCache, null, 2))
}