import fs from 'fs'

const baseSource = `console.log('Hello World!')`

const generateEntry = ({ useTypescript } = {}) => {
  const filename = useTypescript ? 'index.ts' : 'index.js'

  fs.writeFileSync(`./src/${filename}`, baseSource)
}

export default generateEntry
