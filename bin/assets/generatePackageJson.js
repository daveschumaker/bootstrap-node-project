import fs from 'fs'

const generatePackageJson = ({
  projectName,
  userName,
  userEmail,
  useTypescript
} = {}) => {
  const defaultPackage = {
    name: projectName,
    version: '1.0.0',
    description: '',
    type: 'module',
    main: './src/index.js',
    scripts: {
      dev: 'node ./src/index.js',
      start: 'node ./src/index.js',
      test: 'tap'
    },
    keywords: [],
    author: `${userName} <${userEmail}>`,
    license: 'MIT',
    'lint-staged': {
      '**/*.{js,jsx,ts,tsx}': ['npx prettier --write', 'npx eslint --fix']
    }
  }

  if (useTypescript) {
    defaultPackage.main = 'bin/index.js'
    defaultPackage.scripts.build = 'tsc'
    defaultPackage.scripts.dev = 'ts-node ./src/index.ts'
    defaultPackage.scripts.start = 'node ./dist/index.js'
  }

  const formatJson = JSON.stringify(defaultPackage, null, 2)
  fs.writeFileSync('./package.json', formatJson)
}

export default generatePackageJson
