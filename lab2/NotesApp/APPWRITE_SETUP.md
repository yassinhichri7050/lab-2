# 🔧 Configuration Appwrite pour Lab 3

Ce guide vous aide à configurer correctement Appwrite pour l'application Notes Lab 3.

---

## 📋 Prérequis

- [ ] Compte Appwrite Cloud ou instance self-hosted
- [ ] Accès à la console Appwrite
- [ ] Fichier `.env` dans le projet React Native

---

## 🚀 Étape 1 : Créer un Projet

1. Connectez-vous à [Appwrite Cloud](https://cloud.appwrite.io/)
2. Cliquez sur **"Create Project"**
3. Nom du projet : `NotesApp` (ou votre choix)
4. Cliquez sur **"Create"**

**Résultat :** Vous obtenez un **Project ID**

---

## 🗄️ Étape 2 : Créer une Database

1. Dans votre projet, allez dans **"Databases"**
2. Cliquez sur **"Create Database"**
3. Nom : `notes-db`
4. Cliquez sur **"Create"**

**Résultat :** Vous obtenez un **Database ID**

---

## 📦 Étape 3 : Créer la Collection "notes"

1. Dans `notes-db`, cliquez sur **"Create Collection"**
2. Nom : `notes`
3. Cliquez sur **"Create"**

**Résultat :** Vous obtenez un **Collection ID**

---

## 📝 Étape 4 : Ajouter les Attributs

Dans la collection `notes`, allez dans l'onglet **"Attributes"** et ajoutez les attributs suivants :

### 1. Attribut `title`
- **Type :** String
- **Size :** 255
- **Required :** ✅ Oui
- **Default :** (vide)
- Cliquez **"Create"**

### 2. Attribut `content`
- **Type :** String
- **Size :** 10000
- **Required :** ✅ Oui
- **Default :** (vide)
- Cliquez **"Create"**

### 3. Attribut `userId` ⚠️ IMPORTANT
- **Type :** String
- **Size :** 255
- **Required :** ✅ Oui
- **Default :** (vide)
- Cliquez **"Create"**

### 4. Attribut `createdAt`
- **Type :** String
- **Size :** 255
- **Required :** ✅ Oui
- **Default :** (vide)
- Cliquez **"Create"**

### 5. Attribut `updatedAt`
- **Type :** String
- **Size :** 255
- **Required :** ✅ Oui
- **Default :** (vide)
- Cliquez **"Create"**

---

## 🔍 Étape 5 : Créer l'Index sur `userId`

⚠️ **CRUCIAL pour les performances !**

1. Dans la collection `notes`, allez dans l'onglet **"Indexes"**
2. Cliquez sur **"Create Index"**
3. **Index Type :** Key
4. **Attribute :** `userId`
5. **Order :** ASC
6. Cliquez **"Create"**

**Pourquoi ?** L'index accélère les requêtes de filtrage par `userId`.

---

## 🔒 Étape 6 : Configurer les Permissions

### Option 1 : Simple (Development)
1. Dans la collection `notes`, allez dans **"Settings"**
2. Scrollez jusqu'à **"Permissions"**
3. Cliquez **"Add Role"**
4. Sélectionnez **"Any"**
5. Cochez : **Create**, **Read**, **Update**, **Delete**
6. Cliquez **"Update"**

**Note :** Tous les utilisateurs authentifiés ou non peuvent accéder aux documents. Filtrage fait par l'app.

### Option 2 : Sécurisée (Production) ⭐ Recommandée
1. Dans la collection `notes`, allez dans **"Settings"**
2. Scrollez jusqu'à **"Permissions"**
3. Cliquez **"Add Role"**
4. Sélectionnez **"Users"** (tous les utilisateurs authentifiés)
5. Cochez : **Create**, **Read**, **Update**, **Delete**
6. Cliquez **"Update"**

**Ensuite, configurez les permissions au niveau document :**
1. Allez dans **"Document Security"**
2. Activez **"Document Level Security"**
3. Pour chaque document créé, Appwrite vérifiera :
   - L'utilisateur peut lire/modifier/supprimer UNIQUEMENT ses propres documents

**Configuration dans le code (déjà implémentée) :**
```javascript
// Le filtrage côté client assure que seules les notes de l'utilisateur sont récupérées
const notes = await getNotes(user.$id);
```

---

## 🔐 Étape 7 : Activer l'Authentification Email/Password

1. Dans votre projet, allez dans **"Auth"**
2. Cliquez sur l'onglet **"Settings"**
3. Sous **"Auth Methods"**, trouvez **"Email/Password"**
4. Activez le toggle ✅
5. (Optionnel) Désactivez **"Email Verification"** pour le développement
   - En production, gardez-le activé pour vérifier les emails

---

## 📱 Étape 8 : Ajouter une Plateforme

### Pour React Native (Expo)

1. Dans votre projet, allez dans **"Settings"**
2. Scrollez jusqu'à **"Platforms"**
3. Cliquez **"Add Platform"**
4. Sélectionnez **"Flutter"** (marche pour React Native aussi)
5. **Name :** `NotesApp Mobile`
6. **Package Name / Bundle ID :**
   - Android : `com.yourcompany.notesapp` (voir `app.json`)
   - iOS : `com.yourcompany.notesapp`
7. Cliquez **"Next"** puis **"Skip optional steps"**

**Note :** Pour Expo, vous pouvez souvent sauter cette étape en développement.

---

## 🔑 Étape 9 : Récupérer les IDs pour `.env`

### 1. Project ID
- Dans votre projet, cliquez sur **"Settings"**
- Copiez le **Project ID**

### 2. Database ID
- Allez dans **"Databases"**
- Cliquez sur `notes-db`
- Copiez le **Database ID** (en haut)

### 3. Collection ID
- Dans `notes-db`, cliquez sur la collection `notes`
- Copiez le **Collection ID** (en haut)

### 4. Endpoint
- Appwrite Cloud : `https://cloud.appwrite.io/v1`
- Self-hosted : Votre URL (ex: `https://appwrite.example.com/v1`)

---

## 📄 Étape 10 : Configurer le Fichier `.env`

Créez ou modifiez le fichier `.env` à la racine du projet :

```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=votre-project-id-ici
APPWRITE_DATABASE_ID=votre-database-id-ici
APPWRITE_COLLECTION_ID=votre-collection-id-ici
```

**Exemple avec de vrais IDs :**
```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=6543f7a8b2c1d9e0f1a2
APPWRITE_DATABASE_ID=6543f7b9c3d2e0f1a2b3
APPWRITE_COLLECTION_ID=6543f7cad4e3f1a2b3c4
```

⚠️ **Important :**
- Ne committez JAMAIS le fichier `.env` dans Git
- Ajoutez `.env` dans `.gitignore` (déjà fait normalement)
- Partagez les IDs de manière sécurisée avec votre équipe

---

## ✅ Étape 11 : Vérification

### Checklist Finale
- [ ] Projet créé avec Project ID
- [ ] Database créée avec Database ID
- [ ] Collection "notes" créée avec Collection ID
- [ ] 5 attributs ajoutés (title, content, userId, createdAt, updatedAt)
- [ ] Index créé sur `userId`
- [ ] Permissions configurées (Any ou Users)
- [ ] Email/Password activé dans Auth
- [ ] Plateforme ajoutée (optionnel)
- [ ] Fichier `.env` configuré avec les bons IDs
- [ ] `.env` dans `.gitignore`

### Test de Configuration

1. **Redémarrer l'app :**
   ```bash
   npm start -- --clear
   ```

2. **Tester l'inscription :**
   - Remplir le formulaire d'inscription
   - Si succès → Configuration correcte ✅
   - Si erreur → Vérifier les IDs dans `.env`

3. **Vérifier dans Appwrite Console :**
   - Allez dans **Auth → Users**
   - Votre utilisateur doit apparaître
   - Allez dans **Databases → notes-db → notes**
   - Créez une note dans l'app
   - Le document doit apparaître avec `userId` rempli

---

## 🐛 Dépannage

### Erreur : "Project with the requested ID could not be found"
**Solution :**
- Vérifiez `APPWRITE_PROJECT_ID` dans `.env`
- Vérifiez que l'endpoint est correct
- Redémarrez l'app : `npm start -- --clear`

### Erreur : "Database with the requested ID could not be found"
**Solution :**
- Vérifiez `APPWRITE_DATABASE_ID` dans `.env`
- Vérifiez que la database existe dans la console

### Erreur : "Collection with the requested ID could not be found"
**Solution :**
- Vérifiez `APPWRITE_COLLECTION_ID` dans `.env`
- Vérifiez que la collection existe dans la database

### Erreur : "Missing required attribute: userId"
**Solution :**
- Vérifiez que l'attribut `userId` existe dans la collection
- Vérifiez que `userId` est marqué comme **Required**

### Erreur : "User (role: guests) missing scope (account)"
**Solution :**
- L'utilisateur n'est pas connecté
- Déconnectez-vous et reconnectez-vous
- Vérifiez que Email/Password est activé dans Auth

### Les notes d'autres utilisateurs apparaissent
**Solution :**
- Vérifiez que l'index sur `userId` existe
- Vérifiez que `getNotes(user.$id)` est bien appelé
- Vérifiez les permissions de la collection
- Activez Document Level Security si nécessaire

### Erreur : "Invalid API key or Project ID"
**Solution :**
- Vérifiez l'endpoint dans `.env`
- Pour Appwrite Cloud : `https://cloud.appwrite.io/v1`
- Pour self-hosted : Votre URL complète avec `/v1`

---

## 🔐 Sécurité en Production

### 1. Permissions Strictes
```
Role: Users → Create, Read, Update, Delete
+ Document Level Security activée
```

### 2. Email Verification
- Activez **"Email Verification"** dans Auth Settings
- Les utilisateurs doivent vérifier leur email avant de pouvoir se connecter

### 3. Rate Limiting
- Activez le rate limiting dans **Settings → Security**
- Limite les tentatives de connexion répétées

### 4. HTTPS Obligatoire
- Utilisez toujours HTTPS en production
- Appwrite Cloud le fait automatiquement

### 5. Environnement Variables
- Utilisez des secrets dans votre CI/CD
- Ne hardcodez jamais les credentials

---

## 📚 Ressources Supplémentaires

### Documentation Appwrite
- [Getting Started](https://appwrite.io/docs/getting-started-for-web)
- [Database](https://appwrite.io/docs/products/databases)
- [Authentication](https://appwrite.io/docs/products/auth)
- [Permissions](https://appwrite.io/docs/advanced/platform/permissions)

### Communauté
- [Discord Appwrite](https://appwrite.io/discord)
- [Forum Appwrite](https://github.com/appwrite/appwrite/discussions)
- [GitHub Issues](https://github.com/appwrite/appwrite/issues)

---

## ✅ Configuration Terminée !

Si vous avez suivi toutes les étapes, votre configuration Appwrite est prête.

**Prochaines étapes :**
1. Lancez l'app : `npm start`
2. Testez l'inscription/connexion
3. Créez des notes
4. Consultez `QUICKSTART.md` pour les tests

🎉 **Bon développement avec Appwrite !**
