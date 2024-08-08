import fs from 'fs'
import generateRoutes from './generateRoutes.js'

const baseSource = `console.log('Hello World!')`

const withExpress = ({
  defaultPort = 3000,
  useCors
} = {}) => `import express from 'express'
${useCors ? 'import cors from "cors"\n' : ''}import helmet from 'helmet'
import routes from './routes/index.js'

const app = express()
const port = process.env.PORT || ${defaultPort}

${useCors ? 'app.use(cors())\n' : ''}app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

app.use('/api', routes);
app.get('/', (req, res) => {
  res.send('Express Server')
})

app.listen(port, () => {
  console.log(\`[server]: Server is running at http://localhost:\${port}\`)
})`

const withExpressTypescript = ({
  defaultPort = 3000,
  useCors
} = {}) => `import express, { Express, Request, Response } from 'express'
${useCors ? 'import cors from "cors"\n' : ''}import helmet from 'helmet'
import routes from './routes'


const app: Express = express()
const port = process.env.PORT || ${defaultPort}

${useCors ? 'app.use(cors())\n' : ''}app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

app.use('/api', routes);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(\`[server]: Server is running at http://localhost:\${port}\`)
})`

const generateEntry = ({
  defaultPort,
  useCors,
  useExpress,
  useTypescript
} = {}) => {
  const filename = useTypescript ? 'index.ts' : 'index.js'
  let src = baseSource

  if (useExpress) {
    src = withExpress({ defaultPort, useCors })
  }

  if (useExpress && useTypescript) {
    src = withExpressTypescript({ defaultPort, useCors })
  }

  fs.writeFileSync(`./src/${filename}`, src)

  if (useExpress) {
    generateRoutes({ useTypescript })
  }
}

export default generateEntry
