#! /usr/bin/env node

import Box from 'cli-box'
import chalk from 'chalk'
import { input, confirm } from '@inquirer/prompts'
import validate from 'validate-npm-package-name'

import bootstrapProject from './bootstrapProject.js'
import { USER_EMAIL, USER_NAME } from '../config.js'

var b1 = Box('20x1', chalk.magenta.bold('Bootstrap-Node'))
console.log('\n' + b1 + '\n')

const projectName = await input({
  message: 'What is the name of your project?\n  (lower case, no spaces)',
  validate(answer) {
    const validationObject = validate(answer)

    if (!answer) {
      return 'Please fill out a project name!'
    } else if (answer.indexOf(' ') >= 0) {
      return 'Error: Project name cannot contain a space'
    } else if (validationObject?.errors?.length > 0) {
      return validationObject.errors[0]
    }

    return true
  }
})

const userName = await input({
  message: 'What is your name?',
  default: USER_NAME || null,
  validate(answer = '') {
    answer = answer.trim()
    if (!answer) {
      return 'Please fill out your name!'
    }
    return true
  }
})

const userEmail = await input({
  message: 'What is your email address?',
  default: USER_EMAIL || null,
  validate(answer = '') {
    answer = answer.trim()

    // Via: https://stackoverflow.com/a/46181
    const validEmail = answer.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

    if (!answer) {
      return 'Please fill out your email address!'
    } else if (!validEmail) {
      return 'Please enter a valid email address.'
    }
    return true
  }
})

const useTypescript = await confirm({
  message: 'Use Typescript?',
  default: true
})

const useExpress = await confirm({
  message: 'Setup project using Express?',
  default: false
})

let defaultPort = 3000
if (useExpress) {
  defaultPort = await input({
    message: 'What PORT do you want to use?',
    default: defaultPort,
    validate(answer) {
      if (!answer) {
        return 'Please fill out a port!'
      } else if (answer < 1 || answer > 65535) {
        return 'Error: Port must be between 1 and 65535'
      }
      return true
    }
  })
}

let useCors = false
if (useExpress) {
  useCors = await confirm({
    message: 'Enable CORS for Express?',
    default: false
  })
}

const useReload = await confirm({
  message: 'Auto restart dev server on changes using nodemon?',
  default: true
})

bootstrapProject({
  defaultPort,
  projectName,
  useCors,
  useExpress,
  userEmail,
  userName,
  useReload,
  useTypescript
})
