import Database from 'better-sqlite3'

const db = new Database('./src/config/db.sqlite')

db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,
      pseudo VARCHAR(12) NOT NULL,
      password VARCHAR(12) NOT NULL,
      role VARCHAR(12) NOT NULL
    )
  `)

export default db
