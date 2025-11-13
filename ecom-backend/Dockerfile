# ÉTAPE 1: BUILD (Construction de l'application)
# Utilise une image Temurin avec Maven pour la fiabilité
FROM  eclipse-temurin:21 AS builder
# Définir le répertoire de travail pour cette étape
WORKDIR /app
# Copier les fichiers de build Maven
COPY mvnw .
RUN chmod +x mvnw
COPY pom.xml .
COPY .mvn/ .mvn/
# Pré-télécharger les dépendances pour la mise en cache
# RUN ./mvnw dependency:go-offline  # Peut être omis pour simplifier le Dockerfile pour l'exercice
# Copier le code source
COPY ./src ./src
# Construire l'application Spring Boot et générer le JAR
RUN ./mvnw clean package -DskipTests
# ==========================================================
# ÉTAPE 2: RUNTIME (Création de l'image finale)
# Utilise une image JRE légère pour l'exécution
FROM eclipse-temurin:21 AS final
# Utiliser une image JRE (Runtime) légère
# Définir le répertoire de travail pour le conteneur final
WORKDIR /app
# Copier le JAR construit de l'étape 'builder' vers le répertoire de travail du conteneur final
# L'emplacement source est /app/target/ dans l'étape 'builder'
COPY --from=builder /app/target/*.jar /app/app.jar
# Exposer le port du backend
EXPOSE 8083
 # Le port dans le docker-compose.yml est 8083
# Définir le point d'entrée pour lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]







#FROM eclipse-temurin:21-jdk
#VOLUME /tmp
#COPY target/*.jar  app.jar
#EXPOSE 8083
#ENTRYPOINT ["java","-jar", "app.jar"]