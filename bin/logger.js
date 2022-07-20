import chalk from 'chalk'

const logger = (output, options = {}) => {
  const { warning } = options
  const warningText = warning ? chalk.red.bold('WARNING: ') : ''

  const timestamp = new Date().toLocaleTimeString()
  const formatText = `[${timestamp}] ${chalk.magenta.bold(
    '[bootstrap-node]'
  )} ${warningText}${output}`

  console.log(formatText)
}

export default logger
