pipeline {

    agent any

    tools {
        nodejs 'Node22'
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/Sikandar4642/playwrightRepo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }

    }
}