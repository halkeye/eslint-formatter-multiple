pipeline {
  agent none
  options {
    timeout(time: 60, unit: 'MINUTES')
    ansiColor('xterm')
  }

  stages {
    stage('build') {
      parallel {
        stage('node:10') {
          agent { docker { image 'node:10' } }
          steps {
            sh 'npm install'
            sh 'npm run test'
          }
        }


        stage('node:lts') {
          agent { docker { image 'node:lts' } }
          steps {
            sh 'npm install'
            sh 'npm run test'
          }
        }
      }
    }
  }
}

