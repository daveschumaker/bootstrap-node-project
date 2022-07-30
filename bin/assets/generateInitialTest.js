import fs from 'fs'

const baseSource = `// See Getting Started with TAP:
// https://node-tap.org/docs/getting-started/
import t from 'tap'

t.test('initial test', t => {
  t.pass('this is fine')
  t.equal(1, 1)
  t.end()
})
`

const generateInitialTest = ({ useTypescript } = {}) => {
  const filename = useTypescript ? 'index.test.ts' : 'index.test.js'

  fs.writeFileSync(`./src/${filename}`, baseSource)
}

export default generateInitialTest
