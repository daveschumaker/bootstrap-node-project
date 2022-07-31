/**
 * Allows us to quickly test logic behind the bootstrap library
 * without going through the CLI or having to globally install
 * the package each time we make changes.
 */
import shell from 'shelljs'
import bootstrapProject from './bootstrapProject.js'

const cwd = process.cwd()
shell.mkdir(`./test-projects`)

// Basic template
shell.cd(`${cwd}/test-projects`)
bootstrapProject({
  projectName: 'test-project-base',
  userName: 'Testy McTesterson',
  userEmail: 'test@test.com',
  useExpress: false,
  useTypescript: false
})

// TypeScript template
shell.cd(`${cwd}/test-projects`)
bootstrapProject({
  projectName: 'test-project-ts',
  userName: 'Testy McTesterson',
  userEmail: 'test@test.com',
  useExpress: false,
  useTypescript: true
})

// Express template
shell.cd(`${cwd}/test-projects`)
bootstrapProject({
  projectName: 'test-project-express',
  userName: 'Testy McTesterson',
  userEmail: 'test@test.com',
  useExpress: true,
  useTypescript: false
})

// Express template
shell.cd(`${cwd}/test-projects`)
bootstrapProject({
  projectName: 'test-project-ts-express',
  userName: 'Testy McTesterson',
  userEmail: 'test@test.com',
  useExpress: true,
  useTypescript: true
})
