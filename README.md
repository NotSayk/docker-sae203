# Docker SAE203 - Site Web de Vidéo à la Demande

Ce projet implémente un site web de vidéo à la demande, hébergé dans un conteneur Docker. Il utilise Apache pour servir les fichiers du site, avec des pages d'inscription, de connexion et de profil utilisateur.

## Prérequis

Avant de commencer, assurez-vous que vous avez installé les éléments suivants sur votre machine :

- **Docker** : Assurez-vous que Docker est installé et fonctionne correctement. [Télécharger Docker](https://www.docker.com/products/docker-desktop)
- **Git** : Vous aurez besoin de Git pour cloner ce dépôt. [Télécharger Git](https://git-scm.com/downloads)

## Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/votre-utilisateur/docker-sae203.git
cd docker-sae203
```

### 2. Construire l'image Docker
```bash
docker build -t mon_site_web .
```

### 3. Lancer le conteneur Docker
```bash
docker run -d -p 8080:80 mon_site_web
```
Cela démarre le serveur Apache dans un conteneur Docker et vous permet d'accéder au site via votre navigateur à l'adresse http://localhost:8080.

### 4. Accéder au site
Une fois le conteneur en cours d'exécution, ouvrez votre navigateur et accédez à :
```
http://localhost:8080
```

## Fonctionnalités

### Pages disponibles
Le site web inclut les pages suivantes :

- **Page d'accueil** (index.html) : La page principale de votre site de vidéo à la demande
- **Page de connexion** (login.html) : Permet aux utilisateurs de se connecter à leur compte
- **Page d'inscription** (signup.html) : Permet aux utilisateurs de créer un compte
- **Page de profil** (profile.html) : Affiche les informations de profil de l'utilisateur connecté

### Scripts JavaScript
Le projet comprend des scripts JavaScript pour gérer l'authentification et les sessions des utilisateurs :

- **auth.js** : Gère la logique de connexion et d'inscription
- **script.js** : Contient des fonctions générales utilisées sur plusieurs pages
- **session.js** : Gère la gestion de la session de l'utilisateur (connexion et déconnexion)

## Structure du projet

```
docker-sae203/
├── dockerfile             
├── LICENSE               
├── README.md           
├── start.sh              
├── siteweb/              
│   ├── index.html        
│   ├── login.html        
│   ├── profile.html   
│   ├── signup.html      
│   ├── data/             
│   │   └── users.json
│   ├── images/           
│   ├── js/                
│   │   ├── auth.js       
│   │   ├── script.js       
│   │   └── session.js    
│   ├── style/            
│   │   ├── login.css      
│   │   ├── signup.css    
│   │   └── style.css       
│   └── videos/            
│       └── thumbnails      
```