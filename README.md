# BuddI Analytics - Visualisation des Données

## Description du Projet

**BuddI Analytics** est une application web qui permet de visualiser et d'analyser des données de ventes et de produits sous forme de graphiques interactifs. L'application est divisée en deux pages principales :

### Page des Ventes :
- Affiche des graphiques pour analyser les revenus mensuels ou annuels.
- Permet de filtrer les données par année ou par mois.
- **Types de graphiques :**
  - **Graphique en barres** : Revenus par mois ou par année.
  - **Graphique en courbe** : Évolution des revenus.
  - **Graphique en camembert** : Répartition des revenus.

### Page des Produits :
- Affiche des graphiques pour analyser les revenus générés par les produits.
- Permet de filtrer les données par catégorie ou par produit.
- **Types de graphiques :**
  - **Graphique en barres** : Revenus par produit.
  - **Graphique en camembert** : Répartition des revenus globaux par produit.
  - **Graphique en camembert** : Répartition des revenus par catégorie (si aucune catégorie n'est sélectionnée).

## Technologies Utilisées

### **Frontend :**
- Vue.js 3 (Framework JavaScript)
- Chart.js (Librairie de visualisation de graphiques)
- Bootstrap (Framework CSS pour le design)
- Axios (Client HTTP pour les appels API)

### **Backend :**
- Node.js (Runtime JavaScript)
- Express.js (Framework pour créer l'API)
- MongoDB (Base de données NoSQL)

## Installation

### **Prérequis**
Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :
- **Node.js (version 16 ou supérieure)** : [Télécharger Node.js](https://nodejs.org/)
- **MongoDB (local ou via MongoDB Atlas)** : [Télécharger MongoDB](https://www.mongodb.com/)

**Important :** 
- Le nom de la base de données doit être **BuddlDataBase**.
- Les collections doivent être **Ventes** et **Produits**.
- Les fichiers JSON `dataProduits.json` et `dataVentes.json` sont utilisés pour importer les données.

### **Étapes pour installer et exécuter le projet**

#### **1. Cloner le dépôt**
```bash
git clone https://github.com/ton-utilisateur/buddli-analytics.git
cd buddli-analytics
```

#### **2. Installer les dépendances du backend**
```bash
cd backend
npm install
```

#### **3. Configurer la base de données MongoDB**
- Si vous utilisez **MongoDB en local**, assurez-vous que le serveur MongoDB est en cours d'exécution.
- Si vous utilisez **MongoDB Atlas**, configurez l'URL de connexion dans `backend/server.js`.

#### **4. Importer les données**
Dans MongoDB, importe les fichiers JSON dans la base de données :
```
Pour importer les données il suffit sur MongoDB Compass de créer une Base de données (si cela n'est pas déjà fait) pui de créer une table et de cliquer sur "Import Data" et de sélectionner le fichier json souhaité.
```

#### **5. Démarrer le backend**
```bash
npm start
```
Le serveur écoutera sur [http://localhost:5000](http://localhost:5000).

#### **6. Installer les dépendances du frontend**
Dans un autre terminal :
```bash
cd ../frontend
npm install
```

#### **7. Démarrer le frontend**
```bash
npm run serve
```
L'application sera accessible à l'adresse [http://localhost:8080](http://localhost:8080).

## Routes API (Test avec Postman)

### **Routes GET disponibles :**
- **Récupérer les données des ventes :**
  ```
  GET http://localhost:5000/data
  ```
- **Récupérer les données des produits :**
  ```
  GET http://localhost:5000/produits
  ```

## Structure du Projet

### **Backend**
- `server.js` : Fichier principal du backend qui expose les routes API pour récupérer les données des ventes et des produits.
- `routes/` : Contient les routes API (ex : `/data`, `/produits`).
- `models/` : Contient les modèles MongoDB pour les ventes et les produits.

### **Frontend**
- `src/` : Contient le code source du frontend.
- `components/` : Contient les composants Vue.js pour les graphiques (`VenteCharts.vue`, `ProduitCharts.vue`).
- `views/` : Contient les pages principales (`VentesView.vue`, `ProduitView.vue`).
- `router/` : Contient la configuration des routes Vue Router.
- `App.vue` : Composant principal de l'application.
- `main.js` : Point d'entrée de l'application frontend.

## Commandes Utiles

### **Démarrer le backend :**
```bash
cd backend
npm start
```

### **Démarrer le frontend :**
```bash
cd frontend
npm run serve
```

### **Installer les dépendances :**
```bash
npm install
```
