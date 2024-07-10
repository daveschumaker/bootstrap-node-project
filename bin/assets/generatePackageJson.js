import fs from 'fs'

const generatePackageJson = ({
  projectName,
  useReload,
  userEmail,
  userName,
  useTypescript
} = {}) => {
  const baseConfig = {
    name: projectName,
    version: '1.0.0',
    description: '',
    type: 'module',
    main: 'src/index.js',
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

  if (useReload && useTypescript) {
    baseConfig.scripts.dev = 'nodemon'
    baseConfig.nodemonConfig = {
      watch: ['src'],
      ext: 'ts',
      exec: 'ts-node ./src/index.ts'
    }
  }

  if (useReload && !useTypescript) {
    baseConfig.scripts.dev = 'nodemon'
    baseConfig.nodemonConfig = {
      watch: ['src'],
      ext: 'js',
      exec: 'node ./src/index.js'
    }
  }

  if (useTypescript) {
    // https://stackoverflow.com/a/62099904
    delete baseConfig.type

    baseConfig.main = 'dist/index.js'
    baseConfig.scripts.build = 'tsc'
    baseConfig.scripts.dev = 'ts-node ./src/index.ts'
    baseConfig.scripts.start = 'node ./dist/index.js'
    baseConfig.scripts.test = 'tap --ts'
  }

  const formatJson = JSON.stringify(baseConfig, null, 2)
  fs.writeFileSync('./package.json', formatJson)
}

export default generatePackageJson
