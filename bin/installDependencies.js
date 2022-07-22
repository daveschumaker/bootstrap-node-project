import chalk from 'chalk'
import shell from 'shelljs'
import logger from './logger.js'

const installDependencies = () => {
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

  logger(`Installing ${chalk.yellow('lint-staged')}...`)
  shell.exec('npm install lint-staged --save-dev', { silent: true })
}

export default installDependencies
