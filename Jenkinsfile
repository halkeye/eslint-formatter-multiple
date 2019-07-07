pipeline {
  agent none
  options {
    timeout(time: 10, unit: 'MINUTES')
    ansiColor('xterm')
  }

  stages {
    stage('do thing') {
      parallel {
        stage('node:8') {
          agent { docker { image 'node:8' } }
          steps {
            sh 'npm install'
            sh 'npm run test'
          }
        }

        stage('node:9') {
          agent { docker { image 'node:9' } }
          steps {
            sh 'npm install'
            sh 'npm run test'
          }
        }

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

