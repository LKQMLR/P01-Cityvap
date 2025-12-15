import Database from 'better-sqlite3'

const db = new Database('./src/config/db.sqlite')

export default db
