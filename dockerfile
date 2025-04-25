FROM debian:latest

# Installer Apache
RUN apt-get update && apt-get install -y apache2 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copier les fichiers du site dans le dossier web par défaut d'Apache
COPY siteweb/ /var/www/html/

# Donner les bons droits (optionnel mais conseillé)
RUN chown -R www-data:www-data /var/www/html

# Exposer le port 80
EXPOSE 80

# Lancer Apache au démarrage
CMD ["apachectl", "-D", "FOREGROUND"]
