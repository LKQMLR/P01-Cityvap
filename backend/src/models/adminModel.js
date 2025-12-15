import db from '../config/database.js'

export const createAdmin = db.prepare(`
  INSERT INTO admin (name, role) VALUES (?,?)
`)
