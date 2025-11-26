# 📝 Notes App - Lab 3 (Teknolabs)

Application React Native de gestion de notes avec authentification Appwrite et filtrage multi-utilisateurs.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)

---

## 🎯 Fonctionnalités

### ✅ Authentification Complète
- Inscription avec email, mot de passe et nom
- Connexion sécurisée
- Session persistante (reste connecté après fermeture de l'app)
- Déconnexion avec confirmation

### ✅ Gestion des Notes
- Créer des notes (titre + contenu)
- Modifier des notes existantes
- Supprimer des notes
- Filtrage automatique par utilisateur (chaque utilisateur voit uniquement ses propres notes)

### ✅ Interface Utilisateur
- Écran d'authentification moderne avec basculement Login/Register
- Page d'accueil avec message de bienvenue personnalisé
- Liste des notes avec pull-to-refresh
- Empty state élégant quand aucune note
- Loading indicators appropriés
- Messages d'erreur clairs

### ✅ Multi-Utilisateurs
- Isolation complète des données par utilisateur
- Aucune note partagée entre utilisateurs
- Filtrage côté serveur pour sécurité et performance

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 16+ installé
- npm ou yarn
- Expo CLI (installé automatiquement)
- Compte Appwrite (gratuit sur [cloud.appwrite.io](https://cloud.appwrite.io/))

### Installation

1. **Cloner le projet**
   ```bash
   cd NotesApp
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer Appwrite**
   - Suivez le guide détaillé dans [`APPWRITE_SETUP.md`](./APPWRITE_SETUP.md)
   - Créez un projet Appwrite
   - Créez une database et une collection "notes"
   - Ajoutez les attributs requis (title, content, userId, createdAt, updatedAt)
   - Activez Email/Password dans Auth

4. **Configurer le fichier `.env`**
   ```env
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=votre-project-id
   APPWRITE_DATABASE_ID=votre-database-id
   APPWRITE_COLLECTION_ID=votre-collection-id
   ```

5. **Lancer l'application**
   ```bash
   npm start
   ```

   Ou directement :
   ```bash
   npm run android  # Pour Android
   npm run ios      # Pour iOS
   ```

---

## 📂 Structure du Projet

```
NotesApp/
├── App.tsx                         # Point d'entrée avec AuthProvider
├── navigation/
│   └── AuthNavigator.js           # Navigation Auth/App stacks
├── contexts/
│   └── AuthContext.js             # Context d'authentification global
├── services/
│   ├── auth-service.js            # Service Appwrite Account
│   ├── note-service.js            # Service notes avec filtrage userId
│   ├── database-service.js        # Service database générique
│   └── appwrite-config.js         # Client Appwrite configuré
├── screens/
│   ├── AuthScreen.js              # Écran Login/Register
│   ├── HomeScreen.js              # Page d'accueil avec bienvenue
│   └── NotesScreen.js             # Liste des notes
├── components/
│   ├── LogoutButton.js            # Bouton déconnexion
│   ├── AddNoteModal.js            # Modal création de note
│   ├── EditNoteModal.js           # Modal édition de note
│   ├── NoteItem.js                # Item de note
│   └── NoteInput.js               # Input pour notes
├── .env                            # Configuration Appwrite (ne pas committer)
└── package.json                    # Dépendances du projet
```

---

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Guide de démarrage rapide avec tests
- **[APPWRITE_SETUP.md](./APPWRITE_SETUP.md)** - Configuration détaillée d'Appwrite
- **[LAB3_IMPLEMENTATION.md](./LAB3_IMPLEMENTATION.md)** - Documentation complète des fonctionnalités
- **[CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md)** - Résumé des changements Lab 2 → Lab 3
- **[VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md)** - Checklist de vérification

---

## 🧪 Tester l'Application

### Scénario de Test Complet

1. **Inscription**
   - Remplir : Name, Email, Password
   - Cliquer "Register"
   - Vérifier redirection vers Home avec message "Welcome, [Name]!"

2. **Créer des Notes**
   - Cliquer "View Notes"
   - Cliquer "+ Add Note"
   - Remplir titre et contenu
   - Vérifier que la note apparaît immédiatement

3. **Multi-Utilisateurs**
   - Se déconnecter
   - Créer un nouveau compte
   - Créer des notes
   - Vérifier que seules VOS notes apparaissent

4. **Session Persistante**
   - Fermer complètement l'app
   - Rouvrir l'app
   - Vérifier connexion automatique

Consultez [`QUICKSTART.md`](./QUICKSTART.md) pour plus de tests détaillés.

---

## 🛠️ Technologies Utilisées

- **React Native** - Framework mobile cross-platform
- **Expo** - Plateforme de développement React Native
- **React Navigation** - Navigation entre écrans
- **Appwrite** - Backend-as-a-Service (Auth + Database)
- **React Context API** - Gestion d'état global
- **React Hooks** - État et lifecycle dans composants fonctionnels

---

## 📦 Dépendances Principales

```json
{
  "react": "19.1.0",
  "react-native": "0.81.4",
  "expo": "~54.0.13",
  "@react-navigation/native": "^7.1.18",
  "@react-navigation/stack": "^7.4.9",
  "appwrite": "^21.4.0",
  "react-native-dotenv": "^3.4.11"
}
```

---

## 🔐 Sécurité

### Implémenté
- ✅ Authentification sécurisée avec Appwrite
- ✅ Tokens de session gérés automatiquement
- ✅ Filtrage des notes par userId côté serveur
- ✅ Variables d'environnement pour configuration sensible

### Recommandations Production
- Activer la vérification d'email dans Appwrite
- Configurer Document Level Security pour permissions strictes
- Activer le rate limiting
- Utiliser HTTPS en production (automatique avec Appwrite Cloud)

---

## 🐛 Dépannage

### L'app ne démarre pas
```bash
# Effacer le cache
npm start -- --clear

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Erreur "Project with the requested ID could not be found"
- Vérifier les IDs dans `.env`
- Vérifier que l'endpoint est correct
- Redémarrer l'app avec `--clear`

### Les notes ne se chargent pas
- Vérifier que l'attribut `userId` existe dans la collection Appwrite
- Vérifier que l'index sur `userId` est créé
- Vérifier les permissions de la collection

Consultez [`APPWRITE_SETUP.md`](./APPWRITE_SETUP.md) pour plus de solutions.

---

## 🚢 Déploiement avec EAS

```bash
# Installer EAS CLI
npm install -g eas-cli

# Se connecter
eas login

# Configurer le projet
eas build:configure

# Build Android
eas build --platform android --profile production

# Build iOS
eas build --platform ios --profile production
```

---

## 🤝 Contribution

Ce projet est réalisé dans le cadre du **Lab 3 - Teknolabs**.

---

## 📄 Licence

0BSD - Libre d'utilisation

---

## 📞 Support

- **Documentation :** Consultez les fichiers `.md` dans le projet
- **Appwrite :** [Documentation officielle](https://appwrite.io/docs)
- **React Native :** [Documentation officielle](https://reactnative.dev/docs/getting-started)
- **Expo :** [Documentation officielle](https://docs.expo.dev/)

---

## ✅ Checklist de Vérification

- [ ] Node.js installé
- [ ] Projet Appwrite créé
- [ ] Collection "notes" configurée avec attributs
- [ ] Email/Password activé dans Auth
- [ ] Fichier `.env` configuré
- [ ] Dépendances installées (`npm install`)
- [ ] App lancée (`npm start`)
- [ ] Tests d'inscription/connexion réussis
- [ ] Notes créées et filtrées par utilisateur

---

## 🎓 Concepts Appris

- Authentification complète avec Appwrite
- Context API pour état global
- Navigation conditionnelle (Auth flow)
- Filtrage de données par utilisateur
- Session persistante
- Empty states et loading states
- Pull-to-refresh
- Modals pour création/édition

---

## 🎉 Résultat

Application complète de notes avec :
- 🔐 Authentification sécurisée
- 👥 Multi-utilisateurs avec isolation des données
- 📱 Interface moderne et intuitive
- 🚀 Prête pour production

---

**Lab 3 - Teknolabs | React Native + Appwrite**

*Développé avec ❤️ et React Native*
