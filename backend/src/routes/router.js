import { Router } from 'express'
import { addAdmin } from '../controllers/adminController.js'

const router = Router()

router.post('/api/admins', addAdmin)

export default router
