import fs from 'fs'

const baseSource = `console.log('Hello World!')`

const withExpress = `import express from 'express'
import helmet from 'helmet'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded())
app.use(helmet())

app.get('/', (req, res) => {
  res.send('Express Server')
})

app.listen(port, () => {
  console.log(\`[server]: Server is running at https://localhost:\${port}\`)
})`

const withExpressTypescript = `import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded())
app.use(helmet())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(\`[server]: Server is running at https://localhost:\${port}\`)
})`

const generateEntry = ({ useExpress, useTypescript } = {}) => {
  const filename = useTypescript ? 'index.ts' : 'index.js'
  let src = baseSource

  if (useExpress) {
    src = withExpress
  }

  if (useExpress && useTypescript) {
    src = withExpressTypescript
  }

  fs.writeFileSync(`./src/${filename}`, src)
}

export default generateEntry
