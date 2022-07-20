#! /usr/bin/env node

import Box from 'cli-box'
import chalk from 'chalk'
import inquirer from 'inquirer'
import validate from 'validate-npm-package-name'

import bootstrapProject from './bootstrapProject.js'
import { USER_EMAIL, USER_NAME } from '../config.js'

var b1 = Box('20x1', chalk.magenta.bold('Bootstrap-Node'))
console.log('\n' + b1 + '\n')

inquirer
  .prompt([
    {
      name: 'projectName',
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
    },
    {
      name: 'userName',
      message: 'What is your name?',
      default: USER_NAME || null,
      validate(answer = '') {
        answer = answer.trim()
        if (!answer) {
          return 'Please fill out your name!'
        }
        return true
      }
    },
    {
      name: 'userEmail',
      message: 'What is your email address?',
      default: USER_EMAIL || null,
      validate(answer = '') {
        answer = answer.trim()

        // Via: https://stackoverflow.com/a/46181
        const validEmail = answer.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )

        if (!answer) {
          return 'Please fill out your email address!'
        } else if (!validEmail) {
          return 'Please enter a valid email address.'
        }
        return true
      }
    }
  ])
  .then((answers = {}) => {
    const { projectName, userName, userEmail } = answers

    bootstrapProject({
      projectName,
      userName,
      userEmail
    })
  })
