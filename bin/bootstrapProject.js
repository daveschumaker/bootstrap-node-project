import appRoot from 'app-root-path'
import chalk from 'chalk'
import fs from 'fs'
import shell from 'shelljs'

import generateEntry from './assets/generateEntry.js'
import generateEslintJson from './assets/generateEslintJson.js'
import generateInitialTest from './assets/generateInitialTest.js'
import generatePackageJson from './assets/generatePackageJson.js'
import installDependencies from './installDependencies.js'
import logger from './logger.js'

const bootstrapProject = ({
  projectName,
  useExpress,
  userEmail,
  userName,
  useReload,
  useTypescript
} = {}) => {
  console.log(``) // Add an initial linebreak between input prompts and status messages

  // Check if directory exists and bail
  // to prevent overwriting any data.
  if (fs.existsSync(`./${projectName}`)) {
    logger(
      `A directory already exists at: ${chalk.green('./' + projectName)}`,
      { warning: true }
    )
    logger('⛔️ Bootstrap unsuccessful. Exiting...\n', { warning: true })
    throw new Error('Directory already exists')
  }

  logger('🚧 Bootstrapping new node.js project. Stand by...')

  logger(`Creating project directory: ${chalk.green('./' + projectName)}`)
  shell.mkdir(`./${projectName}`)
  shell.cd(`./${projectName}`)

  // Initialize git.
  logger('Initializing git...')
  shell.exec('git init -b main', { silent: true })
  shell.exec(`git config user.name "${userName}"`, { silent: true })
  shell.exec(`git config user.email "${userEmail}"`, { silent: true })
  shell.exec('git config pull.rebase true', { silent: true })
  shell.exec('git config rebase.autoStash true', { silent: true })
  shell.exec('git config rebase.autosquash true', { silent: true })
  shell.exec('git config fetch.prune true', { silent: true })
  shell.exec('git config diff.colorMoved zebra', { silent: true })

  // Make source directory
  logger(`Creating ${chalk.green('./src')} directory...`)
  shell.mkdir('./src')

  // Copy configuration files from this package's
  // assets folder to the new project folder:
  logger('Creating initial configuration files...')
  logger(`Creating ${chalk.green('.gitignore')}...`)
  shell.cp(`${appRoot}/bin/assets/.gitignore`, './.gitignore')

  logger(`Creating ${chalk.green('.prettierrc')}...`)
  shell.cp(`${appRoot}/bin/assets/.prettierrc`, './.prettierrc')

  logger(`Creating ${chalk.green('.eslintrc.json')}...`)
  generateEslintJson({ useTypescript })

  logger(`Creating initial project files...`)
  logger(`Creating ${chalk.green('package.json')}...`)
  generatePackageJson({
    projectName,
    userName,
    userEmail,
    useReload,
    useTypescript
  })

  const extension = useTypescript ? 'ts' : 'js'
  logger(`Creating ${chalk.green(`./src/index.${extension}`)}...`)
  generateEntry({ useExpress, useTypescript })

  logger(`Creating ${chalk.green(`./src/index.test.${extension}`)}...`)
  generateInitialTest({ useTypescript })

  logger(`Installing dependencies from npm...`)
  installDependencies({ useExpress, useReload, useTypescript })

  // Create empty README file.
  logger(`Generating empty ${chalk.green('README.md')}...`)
  shell.exec('touch README.md', { silent: true })

  logger(`Creating initial git commit for project setup`)
  shell.exec(`git add .`, { silent: true })
  shell.exec(`git commit -m "Initial project setup"`, { silent: true })

  logger(`${chalk.green.bold('DONE')} Bootstrapping complete! 🎉`)
  logger(
    `${chalk.green.bold('DONE')} To get started: 👉 ${chalk.green(
      'cd ./' + projectName
    )}`
  )

  console.log(``) // Additional line break at the end
}

export default bootstrapProject
