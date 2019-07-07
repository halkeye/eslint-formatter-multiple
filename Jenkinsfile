pipeline {
  agent none
  options {
    timeout(time: 10, unit: 'MINUTES')
    ansiColor('xterm')
  }

  stages {
    stage('Test') {
      parallel {
        stage('node:8') {
          agent { docker { image 'node:8' } }
          stage('Install') {
            steps {
              sh 'npm install'
            }
          }

          stage('Test') {
            steps {
              sh 'npm run test'
            }
          }
        }
        stage('node:9') {
          agent { docker { image 'node:9' } }
          stage('Install') {
            steps {
              sh 'npm install'
            }
          }

          stage('Test') {
            steps {
              sh 'npm run test'
            }
          }
        }
        stage('node:10') {
          agent { docker { image 'node:10' } }
          stage('Install') {
            steps {
              sh 'npm install'
            }
          }

          stage('Test') {
            steps {
              sh 'npm run test'
            }
          }
        }
        stage('node:lts') {
          agent { docker { image 'node:lts' } }
          stage('Install') {
            steps {
              sh 'npm install'
            }
          }

          stage('Test') {
            steps {
              sh 'npm run test'
            }
          }
        }
      }
    }
  }
}

