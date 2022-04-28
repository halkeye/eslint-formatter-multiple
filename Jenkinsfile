pipeline {
  agent none
  options {
    timeout(time: 60, unit: 'MINUTES')
    ansiColor('xterm')
  }
  
  environment {
    HOME="/tmp"
  }

  stages {
    stage('build') {
      parallel {
        stage('node:12') {
          agent { docker { image 'node:12' } }
          steps {
            sh 'npm install'
            sh 'npm run test'
          }
        }
        
        stage('node:14') {
          agent { docker { image 'node:14' } }
          steps {
            sh 'npm install'
            sh 'npm run test'
          }
        }

        stage('node:16') {
          agent { docker { image 'node:16' } }
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

