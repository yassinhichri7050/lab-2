# Lab 3 - Notes App avec Authentification Appwrite

## ✅ Transformations Complètes

Votre application Notes a été transformée en version complète avec authentification Appwrite. Voici ce qui a été implémenté :

---

## 📁 Nouveaux Fichiers Créés

### 1. Service d'authentification
- **`services/auth-service.js`**
  - Classe `AuthService` avec Account Appwrite
  - Méthodes : `createAccount()`, `login()`, `getCurrentUser()`, `logout()`
  - Gestion automatique de la session après inscription

### 2. Contexte d'authentification
- **`contexts/AuthContext.js`**
  - React Context + hook `useAuth()`
  - État global : `user`, `loading`, `isAuthenticated`
  - Fonctions : `register()`, `login()`, `logout()`
  - Vérification automatique de session au démarrage

### 3. Navigation avec authentification
- **`navigation/AuthNavigator.js`**
  - `AuthStack` : écran de connexion/inscription
  - `AppStack` : écrans Home et Notes (utilisateurs authentifiés)
  - Écran de chargement pendant vérification session
  - Bascule automatique selon statut authentification

### 4. Écran d'authentification
- **`screens/AuthScreen.js`**
  - Mode Login / Register avec basculement
  - Validation des champs (email, password, name)
  - Gestion des erreurs avec messages clairs
  - Redirection automatique après connexion réussie
  - UI moderne et responsive

### 5. Bouton de déconnexion
- **`components/LogoutButton.js`**
  - Confirmation avant déconnexion (Alert)
  - Intégré dans l'en-tête de navigation
  - Redirection vers AuthScreen après logout

---

## 🔧 Fichiers Modifiés

### 1. **`App.tsx`**
- Enveloppé l'app dans `<AuthProvider>`
- Utilise `AuthNavigator` au lieu de `NavigationContainer` direct
- Gestion centralisée de l'authentification

### 2. **`screens/HomeScreen.js`**
- Import et utilisation de `useAuth()`
- Affiche le nom de l'utilisateur connecté : `Welcome, {user.name}!`
- Bouton Logout dans l'en-tête
- Redirection automatique si non authentifié

### 3. **`screens/NotesScreen.js`**
- Import de `useAuth()` pour récupérer `user`
- Filtrage des notes par `userId` : `getNotes(user.$id)`
- **Empty State** : message quand aucune note
  - "You don't have any notes yet."
  - "Tap the '+ Add Note' button to create your first note."
- Pull-to-refresh fonctionnel

### 4. **`services/note-service.js`**
- Fonction `getNotes(userId)` : filtre par utilisateur
- Fonction `createNote(data, userId)` : ajout automatique du `userId`
- Tri par date de création (`createdAt`) descendant

### 5. **`components/AddNoteModal.js`**
- Import de `useAuth()` pour récupérer `user`
- Passe `user.$id` à `createNote(noteData, user.$id)`
- Validation : vérification que l'utilisateur est connecté

---

## 🔑 Fonctionnalités Implémentées

### ✅ Authentification complète
- [x] Inscription avec email, password, nom
- [x] Connexion avec email, password
- [x] Session persistante (vérifiée au démarrage)
- [x] Déconnexion avec confirmation
- [x] Redirection automatique selon statut auth

### ✅ Filtrage par utilisateur
- [x] Chaque note est associée à un `userId`
- [x] Les utilisateurs voient uniquement leurs propres notes
- [x] Création de notes avec `userId` automatique

### ✅ Interface utilisateur
- [x] Écran AuthScreen moderne (Login/Register)
- [x] Message de bienvenue personnalisé avec nom utilisateur
- [x] Bouton Logout dans l'en-tête
- [x] Empty state élégant quand aucune note
- [x] Indicateurs de chargement appropriés

### ✅ Gestion des erreurs
- [x] Messages d'erreur clairs (auth, création note)
- [x] Validation des formulaires
- [x] Gestion des cas où l'utilisateur n'est pas connecté

---

## 📋 Configuration Appwrite Requise

### Dans votre Console Appwrite

1. **Collection "notes" doit avoir ces attributs :**
   - `title` (string, required)
   - `content` (string, required)
   - `userId` (string, required, indexed)
   - `createdAt` (string, required)
   - `updatedAt` (string, required)

2. **Permissions de la collection :**
   - Read : `role:user` ou filtre par `userId`
   - Create : `role:user`
   - Update : `role:user` (propriétaire uniquement)
   - Delete : `role:user` (propriétaire uniquement)

3. **Authentification activée :**
   - Email/Password activé dans les Auth Methods
   - Pas de vérification email requise (optionnel)

---

## 🚀 Comment Tester

### 1. Démarrer l'application
```bash
npm start
# ou
expo start
```

### 2. Test du flux d'authentification
1. L'app démarre sur l'écran AuthScreen
2. Cliquez sur "Don't have an account? Register"
3. Remplissez : Name, Email, Password
4. Cliquez "Register"
5. Vous êtes automatiquement redirigé vers HomeScreen
6. Le message affiche : "Welcome, [Votre Nom]!"

### 3. Test des notes
1. Cliquez sur "View Notes"
2. Si première utilisation : message empty state
3. Cliquez "+ Add Note"
4. Créez une note (titre + contenu)
5. La note apparaît immédiatement dans la liste
6. Pull-to-refresh pour recharger

### 4. Test du filtrage utilisateur
1. Déconnectez-vous (bouton Logout)
2. Créez un nouveau compte (autre email)
3. Créez des notes
4. Vérifiez que seules VOS notes apparaissent
5. Reconnectez-vous avec le premier compte
6. Vérifiez que seules les notes du premier compte apparaissent

### 5. Test de la session persistante
1. Fermez complètement l'app
2. Rouvrez l'app
3. Vous êtes automatiquement connecté (pas d'écran Auth)

---

## 🎨 Améliorations Possibles (Optionnel)

- [ ] Bouton "Forgot Password" avec reset par email
- [ ] Avatar utilisateur dans HomeScreen
- [ ] Splash screen personnalisé
- [ ] Mode sombre
- [ ] Partage de notes entre utilisateurs
- [ ] Catégories de notes
- [ ] Recherche de notes
- [ ] Export des notes en PDF

---

## 📱 Prêt pour EAS Build

L'application est prête pour être déployée avec EAS :

```bash
# Installer EAS CLI
npm install -g eas-cli

# Se connecter à Expo
eas login

# Configurer le projet
eas build:configure

# Build Android
eas build --platform android

# Build iOS
eas build --platform ios
```

---

## 🐛 Résolution de Problèmes

### Erreur : "Account (role: guests) missing scope"
→ L'utilisateur n'est pas connecté. Vérifiez l'authentification dans Appwrite Console.

### Erreur : "Document with the requested ID could not be found"
→ Vérifiez que `APPWRITE_DATABASE_ID` et `APPWRITE_COLLECTION_ID` sont corrects dans `.env`.

### Les notes d'un autre utilisateur apparaissent
→ Vérifiez que le filtre `Query.equal('userId', userId)` est bien appliqué.
→ Vérifiez les permissions de la collection (niveau document).

### L'app ne démarre pas
→ Effacez le cache : `expo start --clear`
→ Réinstallez les dépendances : `rm -rf node_modules && npm install`

---

## ✅ Checklist Finale

- [x] Service d'authentification créé
- [x] Contexte d'authentification créé
- [x] Navigation basée sur l'auth
- [x] Écran AuthScreen (Login/Register)
- [x] Bouton Logout avec confirmation
- [x] HomeScreen affiche le nom utilisateur
- [x] NotesScreen filtre par userId
- [x] Empty state ajouté
- [x] AddNoteModal passe userId
- [x] Pas d'erreurs de compilation
- [x] Config Appwrite non modifiée

---

🎉 **Votre application Lab 3 est complète et prête à l'emploi !**
