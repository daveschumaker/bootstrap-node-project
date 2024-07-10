import fs from 'fs'

const routeBoilerplate = ({ useTypescript = false } = {}) => {
  if (useTypescript) {
    return `
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/example', (req: Request, res: Response) => {
  res.json({ success: true})
})

export default router`
  }

  return `
import express from 'express';
const router = express.Router();

router.get('/example', (req, res) => {
  res.json({ success: true})
})

export default router`
}

const generateRoutes = ({ useTypescript = false } = {}) => {
  const filename = useTypescript ? 'index.ts' : 'index.js'
  const src = routeBoilerplate({ useTypescript })
  const dirPath = './src/routes'

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  fs.writeFileSync(`${dirPath}/${filename}`, src)
}

export default generateRoutes
