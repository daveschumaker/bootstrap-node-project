import chalk from 'chalk'
import shell from 'shelljs'
import replace from 'replace-in-file'

import logger from './logger.js'

// Attempt to match what happens when one runs `npm init -y`
// and it creates a project name based on the parent folder.
// e.g., ~/projects/new-project should resolve to `new-project`
const formatDirName = () => {
  try {
    let dirName = shell.pwd().stdout.split('/').pop().toLowerCase()
    dirName = dirName.replace(/ /g, '-')
    return dirName
  } catch (err) {
    console.log(`An error occurred while trying to generate a project-name`)
    console.log(err)
    process.exit()
  }
}

const replacements = ({
  projectName = '',
  userName = '',
  userEmail = ''
} = {}) => {
  if (!projectName || !userName || !userEmail) {
    logger('Error: Missing project name, user name or user email')
    process.exit()
  }

  logger(`Updating ${chalk.green('package.json')}...`)
  try {
    replace.sync({
      files: './package.json',
      from: '"name": "project-name"',
      to: `"name": "${formatDirName()}"`
    })
  } catch (err) {
    console.log(
      `An error occurred while attempting to replace project name in package.json`
    )
    console.log(err)
    process.exit()
  }

  try {
    replace.sync({
      files: './package.json',
      from: '"author": ""',
      to: `"author": "${userName} <${userEmail}>"`
    })
  } catch (err) {
    console.log(
      `An error occurred while attempting to replace author in package.json`
    )
    console.log(err)
    process.exit()
  }
}

export default replacements
