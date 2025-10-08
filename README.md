🧭 Projet Global DevOps – Application E-commerce (Partie 1 & 2)

Ce projet personnel a été réalisé dans le cadre de ma formation DevOps afin de mettre en pratique les notions de conteneurisation, orchestration, et déploiement automatisé. Il s’agit d’une application e-commerce complète comprenant un frontend Angular, un backend Spring Boot et une base de données MySQL.
L’objectif global est de transformer une application classique en un projet DevOps professionnel, intégrant par la suite les pratiques CI/CD, Kubernetes et le monitoring.

Les deux premières parties présentées ici correspondent à :

1. La préparation et structuration du projet ;

2. La conteneurisation complète avec Docker et Docker Compose.


🧩 Description générale du projet

L’application e-commerce offre une interface utilisateur moderne , permettant de naviguer entre les produits, d’effectuer des recherches et de gérer des commandes.
Le backend Spring Boot gère la logique métier, la sécurité (JWT), et l’accès aux données stockées dans MySQL.
Le frontend Angular, quant à lui, est servi par Nginx et offre une interface responsive.

L’ensemble de ces composants est désormais exécuté sous forme de conteneurs Docker, interconnectés via un réseau interne (ecom-net), ce qui facilite le déploiement, la portabilité et la reproductibilité du projet.


⚙️ Partie 1 – Préparation du projet

La première étape a consisté à organiser le projet en plusieurs modules distincts:

- ecom-backend pour le code Spring Boot ;

- ecom-frontend pour le projet Angular ;

- db (optionnel) pour la configuration MySQL.

Un dépôt Git a été initialisé et poussé vers GitHub.
Un fichier .gitignore a été ajouté pour exclure les fichiers inutiles (builds, logs, secrets, node_modules, etc.).

Avant la conteneurisation, chaque composant a été testé localement :

- build du backend avec ./mvwn clean package -DskipTests
- Lancement du backend avec mvn spring-boot:run ;
- build du frontend avec ng build
- Lancement du frontend avec ng serve ;

Vérification de la connexion à MySQL via localhost:3306.

Une fois la vérification effectuée, le projet a été préparé pour la phase Docker.


🐳 Partie 2 – Conteneurisation avec Docker

L’objectif de cette partie était de conteneuriser les trois services :

Backend Spring Boot → image basée sur openjdk:17, exécutant le backend.jar ;

Frontend Angular → image basée sur nginx:alpine, servant le build Angular depuis dist/fapp/browser ;

MySQL → image officielle mysql:8.0, configurée via des variables d’environnement.

Un fichier docker-compose.yml a été créé pour orchestrer les conteneurs. Il définit :

Un service MySQL avec volume persistant et variables (MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD) ;

Un service Spring Boot configuré pour se connecter à MySQL via mysql-db ;

Un service Angular utilisant Nginx pour servir l’interface utilisateur.

Grâce à docker-compose up --build, l’ensemble du projet peut désormais être lancé en une seule commande, garantissant un environnement homogène sur toute machine.