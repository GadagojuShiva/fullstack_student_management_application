pipeline {
    agent any

    environment {
        AWS_REGION = 'your-aws-region'
        ECR_REGISTRY = 'your-account-id.dkr.ecr.${AWS_REGION}.amazonaws.com'
        ECR_REPOSITORY_BACKEND = 'fullstack_student_management_application/backend'
        ECR_REPOSITORY_FRONTEND = 'fullstack_student_management_application/frontend'
        IMAGE_TAG = "${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Backend') {
                    steps {
                        script {
                            docker.build("${ECR_REGISTRY}/${ECR_REPOSITORY_BACKEND}:${IMAGE_TAG}", "./backend")
                        }
                    }
                }
                stage('Build Frontend') {
                    steps {
                        script {
                            docker.build("${ECR_REGISTRY}/${ECR_REPOSITORY_FRONTEND}:${IMAGE_TAG}", "./frontend")
                        }
                    }
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Test Backend') {
                    steps {
                        sh 'cd backend && npm install && npm test'
                    }
                }
                stage('Test Frontend') {
                    steps {
                        sh 'cd frontend && npm install && npm test'
                    }
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    docker.withRegistry("https://${ECR_REGISTRY}", 'ecr:aws-ecr-credentials') {
                        docker.image("${ECR_REGISTRY}/${ECR_REPOSITORY_BACKEND}:${IMAGE_TAG}").push()
                        docker.image("${ECR_REGISTRY}/${ECR_REPOSITORY_FRONTEND}:${IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                script {
                    sh '''
                    aws ecs update-service --cluster your-cluster-name --service your-backend-service --force-new-deployment
                    aws ecs update-service --cluster your-cluster-name --service your-frontend-service --force-new-deployment
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
