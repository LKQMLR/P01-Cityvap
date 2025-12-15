// Imports
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './src/routes/router.js'

// Configuration dotenv
dotenv.config()

// Initialisation de l'application
const app = express()

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // URL de l'admin React en dev
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', router)

// Configuration du port
const PORT = process.env.PORT || 3000

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
