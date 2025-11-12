#FROM nginx:alpine
#COPY ./nginx.conf  /etc/nginx/conf.d/default.conf
#COPY dist/fapp/browser /usr/share/nginx/html
#EXPOSE 80


# ==========================================================
# ÉTAPE 1: BUILD (Construction de l'application Angular)
# Utilise une image Node pour compiler l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances et installer
# Ceci permet de mettre en cache les dépendances si seulement le code change
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application Angular.
# Le chemin de sortie ('dist/fapp/browser') doit correspondre à votre configuration (angular.json)
RUN npm run build -- --output-path=./dist/fapp/browser

# ==========================================================
# ÉTAPE 2: RUNTIME (Service de l'application via Nginx)
# Utilise une image Nginx très légère pour servir les fichiers statiques
FROM nginx:alpine

# Copier le fichier de configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers compilés depuis l'étape 'builder' vers le répertoire par défaut de Nginx
COPY --from=builder /app/dist/fapp/browser /usr/share/nginx/html

# Exposer le port par défaut de Nginx
EXPOSE 80
