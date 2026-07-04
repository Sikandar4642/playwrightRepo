pipeline {
    agent any

    stages {
        stage('Check Environment') {
            steps {
                bat 'where node'
                bat 'node -v'
                bat 'npm -v'
            }
        }
    }
}