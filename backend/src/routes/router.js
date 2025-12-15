import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('HELLO WORLD FROM ROUTER')
})

export default router
