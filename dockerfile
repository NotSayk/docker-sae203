FROM debian:latest

# Copie des fichiers du site web dans le dossier de base Apache
COPY siteweb/ /var/www/html/

# Copie du script de démarrage
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Exposition du port HTTP
EXPOSE 80

# Démarrage du service Apache
CMD ["/start.sh"]
