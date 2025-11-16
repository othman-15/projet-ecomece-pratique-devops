🧭 Projet Global DevOps – Application E-commerce

Ce projet personnel, réalisé dans le cadre de ma formation DevOps, a pour but de transformer une application e-commerce classique (Angular, Spring Boot, MySQL) en une solution professionnelle intégrant les meilleures pratiques de conteneurisation, d'automatisation (CI/CD avec Jenkins), d'orchestration (Kubernetes) et de monitoring (Prometheus/Grafana).

Les deux premières parties sont terminées et prêtes pour l'intégration CI/CD.



🧩 Description Générale du Projet

L’application e-commerce est structurée en trois services interconnectés :

Frontend (Angular) : Interface utilisateur moderne servie par Nginx.

Backend (Spring Boot) : API REST gérant la logique métier et la sécurité (JWT).

Base de données (MySQL) : Stockage des données produits et commandes.

L’ensemble est désormais géré par Docker Compose, ce qui assure la portabilité et la reproductibilité de l’environnement.

⚙️ Partie 1 – Préparation et Structuration

Cette phase a consisté à poser les bases du projet :

Organisation : Le code est séparé en répertoires ecom-backend, ecom-frontend.

Versionnement : Initialisation d'un dépôt Git et poussée vers GitHub.

Exclusions : Mise en place des fichiers .gitignore pour exclure les builds, logs, secrets et dépendances (node_modules, target/).

🐳 Partie 2 – Conteneurisation avec Docker

Cette phase est validée et le projet est entièrement conteneurisé.

Dockerfiles Multi-Stage :

Backend : Utilisation d'un Dockerfile multi-stage basé sur eclipse-temurin:21 pour la compilation (mvnw clean package) et le runtime léger, garantissant des images finales optimisées.

Frontend : Utilisation d'un Dockerfile multi-stage pour la compilation Angular avec Node.js, et le service des assets statiques via Nginx (nginx:alpine).

Orchestration : Le fichier docker-compose.yml définit l'ensemble de l'environnement, incluant les variables d'environnement pour la connexion MySQL et un healthcheck pour la base de données afin de garantir l'ordre de démarrage.

🚀 Démarrage Rapide (Lancement Local via Docker Compose)

Pour démarrer l'environnement complet (MySQL, Backend, Frontend) :

Assurez-vous que Docker Desktop est lancé.

Placez-vous à la racine du projet.

Lancez la commande :

docker-compose up --build


L'application sera accessible dans votre navigateur à l'adresse : http://localhost:8086

🚀 Partie 3 – CI/CD avec Jenkins (Succès Complet)

Cette phase a permis d'automatiser l'ensemble du processus de build et de publication des images sur Docker Hub.

Architecture Jenkins

Installation : Jenkins est installé sur une Machine Virtuelle CentOS .

Plugins : Installation des plugins essentiels (Git, Docker Pipeline, NodeJS, Maven Integration).

Identifiants : Création d'un identifiant secret nommé dockerhub-creds dans Jenkins pour stocker le Jeton d'Accès Docker Hub (avec droits d'écriture).

Pipeline Déclaratif (Jenkinsfile)

Le pipeline est configuré en mode Multibranch et exécute les étapes suivantes :

Checkout Code : Clone le dépôt GitHub.

Build Backend Image : Exécute docker build en mode multi-stage sur ./ecom-backend.

Build Frontend Image : Exécute docker build en mode multi-stage sur ./ecom-frontend.

Push Images to Docker Hub : Se connecte au registre ("...."") en utilisant le Jeton d'Accès, puis pousse les images backend et frontend avec les tags ${env.BUILD_NUMBER} et :latest.

Résolution : Malgré des échecs initiaux dus à un problème de portée du Jeton d'Accès et des problèmes de connection reset by peer, l'étape a été validée avec succès.

Résultat Final

Les images suivantes sont disponibles sur Docker Hub, prêtes pour le déploiement Kubernetes :

root855/ecom-app-backend:latest

root855/ecom-app-frontend:latest

🛠️ Démarrage Rapide (Lancement Local via Docker Compose)

Pour démarrer l'environnement complet (MySQL, Backend, Frontend) pour le développement local :

Assurez-vous que Docker Desktop est lancé.

Placez-vous à la racine du projet.

Lancez la commande :

docker-compose up --build


L'application sera accessible dans votre navigateur à l'adresse : http://localhost:8086

⏭️ Prochaine Étape : Partie 4 – Orchestration avec Kubernetes

L'étape suivante est de déployer ces images sur un cluster Minikube local, de configurer les secrets et volumes persistants, et de rendre l'application accessible via un service Kubernetes.