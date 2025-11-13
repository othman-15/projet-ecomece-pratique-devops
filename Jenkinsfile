// Pipeline Jenkins pour le projet E-commerce (Spring Boot + Angular)
pipeline {
    // Exécute le pipeline sur l'agent principal.
    // NOTE : L'agent doit avoir l'accès au démon Docker de la VM (socket /var/run/docker.sock)
    agent any

    // Variables globales
    environment {
        // Remplacer VOTRE_REGISTRE_DOCKER par votre nom d'utilisateur Docker Hub
        REGISTRY = 'root855'
        APP_NAME = 'ecom-app'

        // ID de l'identifiant Docker Hub créé (dockerhub-creds)
        DOCKER_HUB_CREDENTIALS = 'dockerhub-creds'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Cette étape est implicite dans les pipelines multibranch, mais explicite pour la clarté.
                // Elle s'assure que le code est cloné avant le build.
                checkout scm
                echo "Code cloné depuis Git."
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    echo "Construction de l'image Backend Spring Boot (Multi-Stage)..."
                    // Utilise les Dockerfile multi-stage pour builder le JAR et l'image finale
                    sh "docker build -t ${REGISTRY}/${APP_NAME}-backend:${env.BUILD_NUMBER} ./ecom-backend"
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    echo "Construction de l'image Frontend Angular (Multi-Stage)..."
                    // Utilise le Dockerfile multi-stage pour compiler Angular et l'image Nginx
                    sh "docker build -t ${REGISTRY}/${APP_NAME}-frontend:${env.BUILD_NUMBER} ./ecom-frontend"
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    echo "Authentification et Push des images vers Docker Hub..."
                    docker.withRegistry("https://registry.hub.docker.com", DOCKER_HUB_CREDENTIALS) {
                        // Push de l'image du backend avec deux tags (BUILD_NUMBER et latest)
                        docker.image("${REGISTRY}/${APP_NAME}-backend:${env.BUILD_NUMBER}").push()
                        docker.image("${REGISTRY}/${APP_NAME}-backend:${env.BUILD_NUMBER}").push('latest')

                        // Push de l'image du frontend
                        docker.image("${REGISTRY}/${APP_NAME}-frontend:${env.BUILD_NUMBER}").push()
                        docker.image("${REGISTRY}/${APP_NAME}-frontend:${env.BUILD_NUMBER}").push('latest')
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo "Déploiement K8s sera effectué ici (Partie 4)"
                }
            }
        }
    }
}