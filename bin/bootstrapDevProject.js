/**
 * Allows us to quickly test logic behind the bootstrap library
 * without going through the CLI or having to globally install
 * the package each time we make changes.
 */

import bootstrapProject from './bootstrapProject.js'

bootstrapProject({
  projectName: 'test-project',
  userName: 'Testy McTesterson',
  userEmail: 'test@test.com'
})
