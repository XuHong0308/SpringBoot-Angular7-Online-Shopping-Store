pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'backend-image'
        FRONTEND_IMAGE = 'frontend-image'
        POSTGRES_IMAGE = 'postgres'
        DOCKER_NETWORK = 'my-network'
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

         stage('Build Frontend Assets') {
            steps {
                script {
                    // Navigate to the frontend directory and build the frontend files
                    dir('frontend') {
                        bat 'npm install'
                        bat 'npm run build'  // This should create the "dist" folder
                    }
                }
            }
        }

        stage('Build Backend JAR') {
            steps {
                script {
                    // Build the JAR file for the backend using Maven or Gradle
                    dir('backend') {
                        // If using Maven
                        bat 'mvn clean package'

                        // If using Gradle, replace with:
                        // bat 'gradle build'
                    }
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    // Build backend Docker image using %BACKEND_IMAGE% for Windows batch script
                    dir('backend') {
                        bat 'docker build -t %BACKEND_IMAGE% .'
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    // Build frontend Docker image using %FRONTEND_IMAGE%
                    dir('frontend') {
                        bat 'docker build -t %FRONTEND_IMAGE% .'
                    }
                }
            }
        }

        stage('Start PostgreSQL Container') {
            steps {
                script {
                    // Stop and remove existing PostgreSQL container if running
                    bat 'docker stop %POSTGRES_CONTAINER% || true'
                    bat 'docker rm %POSTGRES_CONTAINER% || true'
                    
                    // Start PostgreSQL container
                    bat 'docker run -d --name %POSTGRES_CONTAINER% --network %DOCKER_NETWORK% -e POSTGRES_DB=mydatabase -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -p 5432:5432 %POSTGRES_IMAGE%'
                }
            }
        }

        stage('Start Backend Container') {
            steps {
                script {
                    // Stop and remove existing backend container if running
                    bat 'docker stop %BACKEND_CONTAINER% || true'
                    bat 'docker rm %BACKEND_CONTAINER% || true'
                    
                    // Start backend container
                    bat 'docker run -d --name %BACKEND_CONTAINER% --network %DOCKER_NETWORK% -e DB_HOST=%POSTGRES_CONTAINER% -e DB_PORT=5432 -e DB_NAME=mydatabase -e DB_USERNAME=myuser -e DB_PASSWORD=mypassword -p 8090:8080 %BACKEND_IMAGE%'
                }
            }
        }

        stage('Start Frontend Container') {
            steps {
                script {
                    // Stop and remove existing frontend container if running
                    bat 'docker stop %FRONTEND_CONTAINER% || true'
                    bat 'docker rm %FRONTEND_CONTAINER% || true'

                    // Start frontend container
                    bat 'docker run -d --name %FRONTEND_CONTAINER% --network %DOCKER_NETWORK% -p 3000:80 %FRONTEND_IMAGE%'
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
