require('dotenv').config({ path: `../.development.env` })
import scanner from 'sonarqube-scanner'

scanner(
  {
    serverUrl: `${process.env.SONAR_URL}`,
    options: {
      'sonar.projectName': 'choreScheduler-backend',
      'sonar.projectKey': 'choreScheduler-backend',
      'sonar.login': process.env.SONAR_LOGIN,
      'sonar.password': process.env.SONAR_PASSWORD,
      'sonar.projectDescription': 'Chore Scheduler Backend',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.exclusions': '**/node_modules/**',
      'sonar.test.inclusions': '**/*.spec.ts',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.sourceEncoding': 'UTF-8'
    }
  },
  () => process.exit()
)
