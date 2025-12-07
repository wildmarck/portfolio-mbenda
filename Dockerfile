# Etape 1 : On utilise Nginx comme base (super léger)
FROM nginx:alpine

# On ajoute des métadonnées
LABEL maintainer="MBENDA PRINCE WILDMARCK <marclapuissance10@gmail.com>"
LABEL description="Projet Etudiant DevOps - Portefolio"
LABEL version="1.0"

# Etape 2 : Copie des fichiers du site
# On suppose que ton index.html est à la racine. 
COPY . /usr/share/nginx/html

# Etape 3 : Exposition du port
EXPOSE 80

# Etape 4 : Lancement
CMD ["nginx", "-g", "daemon off;"]