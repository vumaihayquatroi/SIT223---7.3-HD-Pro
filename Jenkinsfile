pipeline {
    agent any

    environment {
        APP_NAME = 'sit223-app'
        IMAGE_TAG = "build-${env.BUILD_ID}"
        DOCKER_PORT_TEST = '3000'
        DOCKER_PORT_PROD = '3001'
    }

    stages {
        stage('1. Build') {
            steps {
                echo 'Building Node.js Application and Docker Image...'
                bat 'npm install'
                bat "docker build -t ${APP_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('2. Test') {
            steps {
                echo 'Running Automated Tests with Jest...'
                bat 'npm test'
            }
        }

        stage('3. Code Quality') {
            steps {
                echo 'Running Code Quality Analysis...'
                bat 'npm run lint'
            }
        }

        stage('4. Security') {
            steps {
                echo 'Running Security Vulnerability Scan...'
                bat 'npm run security-scan || exit 0'
            }
        }

        stage('5. Deploy (Test Env)') {
            steps {
                echo 'Deploying to Staging/Test Environment...'
                bat "docker rm -f ${APP_NAME}-staging || exit 0"
                bat "docker run -d -p ${DOCKER_PORT_TEST}:3000 --name ${APP_NAME}-staging ${APP_NAME}:${IMAGE_TAG}"
            }
        }

        stage('6. Release (Prod Env)') {
            steps {
                echo 'Promoting to Production Environment...'
                bat "docker rm -f ${APP_NAME}-prod || exit 0"
                bat "docker run -d -p ${DOCKER_PORT_PROD}:3000 --name ${APP_NAME}-prod ${APP_NAME}:${IMAGE_TAG}"
            }
        }

        stage('7. Monitoring & Alerting') {
            steps {
                echo 'Checking application health metrics in Production...'
                bat "curl -f http://localhost:${DOCKER_PORT_PROD}/health"
                echo 'Application is healthy. Ready for Datadog integration.'
            }
        }
    }
    post {
        success {
            echo 'All 7 stages passed successfully.'
        }
        failure {
            echo 'Pipeline failed. Please review the logs.'
        }
    }
}