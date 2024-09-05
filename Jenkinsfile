pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'backend-image'
        FRONTEND_IMAGE = 'frontend-image'
        POSTGRES_IMAGE = 'postgres'
        DOCKER_NETWORK = 'my-network'
        DOCKER_HUB_CREDENTIALS = 'dockerhub-credentials' // Your DockerHub credentials ID in Jenkins
        GIT_REPO = 'https://github.com/XuHong0308/SpringBoot-Angular7-Online-Shopping-Store.git'
        POSTGRES_CONTAINER = 'postgres-container'
        BACKEND_CONTAINER = 'backend-container'
        FRONTEND_CONTAINER = 'frontend-container'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout code from the "deployment" branch
                git branch: 'deployment', url: "${GIT_REPO}"
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    // Navigate to the backend directory and build backend Docker image
                    dir('backend') {
                        docker.build("${BACKEND_IMAGE}")
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    // Navigate to the frontend directory and build frontend Docker image
                    dir('frontend') {
                        docker.build("${FRONTEND_IMAGE}")
                    }
                }
            }
        }

        stage('Start PostgreSQL Container') {
            steps {
                script {
                    // Stop and remove existing PostgreSQL container if running
                    sh 'docker stop ${POSTGRES_CONTAINER} || true'
                    sh 'docker rm ${POSTGRES_CONTAINER} || true'
                    
                    // Start PostgreSQL container
                    sh 'docker run -d --name ${POSTGRES_CONTAINER} --network ${DOCKER_NETWORK} -e POSTGRES_DB=mydatabase -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -p 5432:5432 ${POSTGRES_IMAGE}'
                }
            }
        }

        stage('Start Backend Container') {
            steps {
                script {
                    // Stop and remove existing backend container if running
                    sh 'docker stop ${BACKEND_CONTAINER} || true'
                    sh 'docker rm ${BACKEND_CONTAINER} || true'
                    
                    // Start backend container
                    sh 'docker run -d --name ${BACKEND_CONTAINER} --network ${DOCKER_NETWORK} -e DB_HOST=${POSTGRES_CONTAINER} -e DB_PORT=5432 -e DB_NAME=mydatabase -e DB_USERNAME=myuser -e DB_PASSWORD=mypassword -p 8090:8080 ${BACKEND_IMAGE}'
                }
            }
        }

        stage('Start Frontend Container') {
            steps {
                script {
                    // Stop and remove existing frontend container if running
                    sh 'docker stop ${FRONTEND_CONTAINER} || true'
                    sh 'docker rm ${FRONTEND_CONTAINER} || true'

                    // Start frontend container
                    sh 'docker run -d --name ${FRONTEND_CONTAINER} --network ${DOCKER_NETWORK} -p 3000:80 ${FRONTEND_IMAGE}'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed'
        }
        success {
            echo 'Deployment succeeded'
        }
        failure {
            echo 'Deployment failed'
        }
    }
}
