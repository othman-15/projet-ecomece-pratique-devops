Fapp - Plateforme e-Commerce

TP Angular - Ouseffar Othman

Nom : OuseffarPrénom : OthmanProjet : Plateforme e-Commerce Angular + Spring Boot

🌐 Aperçu du Projet

Ce projet est une application web d'e-commerce full-stack développée en utilisant :

Frontend : Angular 16+, Bootstrap 5

Backend : Spring Boot + JWT Security

Base de données : MySQL

Fonctionnalités principales :

Authentification JWT (Admin / Utilisateur)

Liste et détails des produits

Ajout, modification, suppression des produits (admin)

Panier utilisateur

Gestion des utilisateurs (admin)

🚀 Lancement du projet

Démarrer le serveur de développement Angular

ng serve

Puis ouvrir : http://localhost:4200/

Lancer le backend Spring Boot

Dans le dossier backend (Spring Boot) :

./mvnw spring-boot:run

L'API sera accessible sur http://localhost:8083/api

🔧 Fonctionnalités implémentées

🔐 Authentification JWT

Login / Signup avec jeton JWT stocké dans localStorage

Décodage du token pour récupérer role, firstName et email

📄 Liste Produits

Affichage dynamique depuis l'API

Détails d'un produit (image, titre, prix, couleurs...)

Design personnalisé avec Bootstrap 5 + Bootstrap Icons

🍭 Panier Utilisateur

Ajout d'un produit avec sélection de couleur (optionnelle)

Sauvegarde en local (ou future intégration backend)

👨‍💻 Espace Admin

Accessible uniquement via ROLE_ADMIN

Dashboard

Liste des clients

Liste des produits avec actions : Ajouter / Modifier / Supprimer

🎨 Technologies utilisées

Angular CLI v16+

Bootstrap 5

Spring Boot v3+

MySQL

JWT (JSON Web Token)

🌐 API Backend

L'API expose des routes comme :

POST /api/auth/register

POST /api/auth/login

GET /api/products

POST /api/products

DELETE /api/products/{id}

⚙️ Commandes Utiles Angular

Générer un nouveau composant

ng generate component component-name

Liste des schémas disponibles

ng generate --help

Build du projet

ng build

Tests unitaires (Karma)

ng test

Tests end-to-end (e2e)

ng e2e

🔗 Liens Utiles

Angular CLI Docs

Bootstrap 5

Spring Boot Docs

JWT

🚀 Capture d'écran
![home-page](https://github.com/user-attachments/assets/48dc8c0c-e8ac-432b-a621-6556b0e08125)

![login-page](https://github.com/user-attachments/assets/d42ef4ce-caf4-4e4b-992e-eb733801f15c)
![panier](https://github.com/user-attachments/assets/11a2514e-a07b-472d-b7c0-0585d69e3efe)
![panier-vide](https://github.com/user-attachments/assets/855de13f-8f47-4150-bb8e-869c3bb80699)

![page-admin-ajouter-produit](https://github.com/user-attachments/assets/b3120076-ab0c-4b65-9a5d-9d741ae8bd89)
![page-admin-list-produit](https://github.com/user-attachments/assets/8a48004e-cef0-49dd-b807-effd6cb13ad9)
![page-dinscription](https://github.com/user-attachments/assets/8cd5fd0f-4b02-4191-b398-497508f6087d)

![details-page2](https://github.com/user-attachments/assets/11d3af6a-ae7b-4127-a6bb-ae15088bdd9d)
![page-de details](https://github.com/user-attachments/assets/d9a48623-8f48-455f-a77e-cec791e3382f)


💼 Licence

Ce projet est réalisé dans le cadre d'un TP universitaire. Utilisation libre à but éducatif.
