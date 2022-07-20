/**
 * Check if config.js exists in root directory. If not, create it
 * with default values set to an empty string. This data will be
 * used as defaults (if it exsits) in a lookup when setting up
 * projects.
 */

import appRoot from 'app-root-path'
import fs from 'fs'
import logger from './logger.js'

const filename = `config.js`

const defaultSettings = `
export const LICENSE = ''
export const USER_EMAIL = ''
export const USER_NAME = ''
`

if (!fs.existsSync(`${appRoot}/${filename}`)) {
  logger(
    `Warning: config.js does not exist, creating default configuration template`
  )
  fs.writeFileSync(`${appRoot}/${filename}`, defaultSettings.trim() + '\n')
}
