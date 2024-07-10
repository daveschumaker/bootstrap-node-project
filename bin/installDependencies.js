import appRoot from 'app-root-path'
import chalk from 'chalk'
import shell from 'shelljs'

import generateTsconfig from './assets/generateTsconfig.js'
import logger from './logger.js'

const installDependencies = ({
  useCors,
  useExpress,
  useReload,
  useTypescript
} = {}) => {
  if (useTypescript) {
    logger(`Installing ${chalk.yellow('typescript')}...`)
    shell.exec('npm install typescript --save-dev', { silent: true })
    shell.exec('npm install ts-node --save-dev', { silent: true })
    shell.exec('npm install @types/node --save-dev', { silent: true })
    shell.exec('npm install @typescript-eslint/parser --save-dev', {
      silent: true
    })
    shell.exec('npm install @typescript-eslint/eslint-plugin --save-dev', {
      silent: true
    })
    generateTsconfig()
  }

  logger(`Installing ${chalk.yellow('prettier')}...`)
  shell.exec('npm install prettier --save-dev', { silent: true })

  logger(`Installing ${chalk.yellow('eslint')}...`)
  shell.exec('npm install eslint --save-dev', { silent: true })

  logger(`Installing ${chalk.yellow('eslint-config-prettier')}...`)
  shell.exec('npm install eslint-config-prettier --save-dev', { silent: true })

  logger(`Installing ${chalk.yellow('eslint-plugin-prettier')}...`)
  shell.exec('npm install eslint-plugin-prettier --save-dev', { silent: true })

  logger(`Installing ${chalk.yellow('tap')}...`)
  shell.exec('npm install tap --save-dev', { silent: true })

  logger(`Installing ${chalk.yellow('husky')}...`)
  shell.exec('npx husky-init', { silent: true })
  shell.cp('-fr', `${appRoot}/bin/assets/.husky`, './')
  shell.exec('npm install', { silent: true })

  logger(`Installing ${chalk.yellow('lint-staged')}...`)
  shell.exec('npm install lint-staged --save-dev', { silent: true })

  if (useExpress) {
    logger(`Installing ${chalk.yellow('express')}...`)
    shell.exec('npm install express', { silent: true })
    shell.exec('npm install helmet', { silent: true })

    if (useTypescript) {
      shell.exec('npm install @types/express --save-dev', { silent: true })
    }
  }

  if (useCors) {
    logger(`Installing ${chalk.yellow('cors')}...`)
    shell.exec('npm install cors', { silent: true })
  }

  if (useReload) {
    logger(`Installing ${chalk.yellow('nodemon')}...`)
    shell.exec('npm install nodemon', { silent: true })
  }
}

export default installDependencies
