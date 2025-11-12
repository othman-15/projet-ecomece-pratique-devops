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

⏭️ Prochaine Étape : Partie 3 – CI/CD avec Jenkins

La prochaine phase consistera à créer un Pipeline Jenkins pour automatiser :

Le clonage du dépôt.

La construction des images Docker (en utilisant les Dockerfiles multi-stage).

L'authentification et le push des images vers Docker Hub.

Le déploiement automatisé sur Kubernetes (Partie 4).