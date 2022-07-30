import fs from 'fs'

const generateEslintJson = ({ useTypescript } = {}) => {
  const baseConfig = {
    root: true,
    env: {
      browser: true,
      es6: true,
      node: true
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
    ignorePatterns: ['build/', 'dist/'],
    parserOptions: {
      allowImportExportEverwhere: true,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-undef': [
        'error',
        {
          typeof: true
        }
      ],
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false
        }
      ]
    }
  }

  if (useTypescript) {
    if (!baseConfig.plugins) {
      baseConfig.plugins = []
    }

    baseConfig.extends.push('plugin:@typescript-eslint/recommended')
    baseConfig.parser = '@typescript-eslint/parser'
    baseConfig.plugins.push('@typescript-eslint')
  }

  const formatJson = JSON.stringify(baseConfig, null, 2)
  fs.writeFileSync('./.eslintrc.json', formatJson)
}

export default generateEslintJson
