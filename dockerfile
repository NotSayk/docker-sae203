FROM debian:latest

# Mise à jour de la liste des paquets et installation d'Apache
RUN apt-get update && \
    apt-get install -y apache2 && \
    apt-get clean

# Configuration du serveur Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copie des fichiers du site web dans le dossier de base Apache
COPY siteweb/ /var/www/html/

# Copie du script de démarrage
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Exposition du port HTTP
EXPOSE 80

# Démarrage du service Apache
CMD ["/start.sh"]
