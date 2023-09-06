# Utilisez une image Node.js en tant qu'image de base
FROM node:18.16.0

# Créez un répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et le package-lock.json de votre application
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Exposez le port sur lequel votre application écoute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["npm", "start"]