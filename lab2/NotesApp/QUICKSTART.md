# 🚀 Guide de Démarrage Rapide - Lab 3

## Configuration Préalable

### 1. Vérifier votre fichier `.env`
Assurez-vous que votre fichier `.env` contient :
```
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=votre-project-id
APPWRITE_DATABASE_ID=votre-database-id
APPWRITE_COLLECTION_ID=votre-collection-id
```

### 2. Configuration Appwrite Console

#### Créer/Vérifier la collection "notes"
Allez dans votre projet Appwrite → Databases → Votre Database

**Attributs requis :**
1. `title` - String, Required, Size: 255
2. `content` - String, Required, Size: 10000
3. `userId` - String, Required, Size: 255, **INDEX activé**
4. `createdAt` - String, Required, Size: 255
5. `updatedAt` - String, Required, Size: 255

**Permissions de la collection :**
- Aller dans Settings de la collection
- Permissions :
  ```
  Role: Any → Create, Read, Update, Delete
  ```
  OU (plus sécurisé) :
  ```
  Role: Users → Create, Read, Update, Delete
  ```

#### Activer l'authentification Email/Password
1. Allez dans Auth → Settings
2. Activez "Email/Password"
3. Désactivez "Email Verification" (optionnel pour dev)

---

## 🏃 Lancer l'Application

```bash
# Installer les dépendances (si pas déjà fait)
npm install

# Démarrer Expo
npm start

# Ou directement sur Android/iOS
npm run android
npm run ios
```

---

## 🧪 Scénario de Test Complet

### Test 1 : Inscription
1. L'app démarre → Écran "Notes App" avec Login/Register
2. Cliquez sur "Don't have an account? Register"
3. Remplissez :
   - Name : `John Doe`
   - Email : `john@example.com`
   - Password : `password123`
4. Cliquez "Register"
5. ✅ Vous êtes automatiquement connecté
6. ✅ Vous voyez "Welcome, John Doe!"

### Test 2 : Créer des Notes
1. Cliquez "View Notes"
2. ✅ Vous voyez le message empty state
3. Cliquez "+ Add Note"
4. Remplissez :
   - Title : `Ma première note`
   - Content : `Ceci est un test`
5. Cliquez "Save Note"
6. ✅ La note apparaît immédiatement dans la liste

### Test 3 : Éditer une Note
1. Cliquez sur une note dans la liste
2. Modifiez le titre ou le contenu
3. Cliquez "Save"
4. ✅ Les changements sont visibles immédiatement

### Test 4 : Supprimer une Note
1. Appuyez longuement sur une note (ou cliquez Delete)
2. Confirmez la suppression
3. ✅ La note disparaît de la liste

### Test 5 : Déconnexion
1. Cliquez le bouton "Logout" (en haut à droite)
2. Confirmez la déconnexion
3. ✅ Vous êtes redirigé vers l'écran Auth

### Test 6 : Connexion
1. Remplissez :
   - Email : `john@example.com`
   - Password : `password123`
2. Cliquez "Login"
3. ✅ Vous êtes connecté
4. ✅ Vous voyez vos notes précédentes

### Test 7 : Multi-Utilisateurs
1. Déconnectez-vous
2. Créez un nouveau compte :
   - Email : `jane@example.com`
   - Password : `password123`
3. Créez quelques notes
4. ✅ Vous ne voyez que VOS notes (pas celles de John)
5. Déconnectez-vous et reconnectez-vous avec `john@example.com`
6. ✅ Vous voyez uniquement les notes de John

### Test 8 : Persistance de Session
1. Fermez complètement l'app (kill process)
2. Rouvrez l'app
3. ✅ Vous êtes automatiquement connecté (pas d'écran Auth)
4. ✅ Vos notes sont chargées automatiquement

---

## 📊 Structure du Projet

```
NotesApp/
├── App.tsx                          # Point d'entrée avec AuthProvider
├── navigation/
│   └── AuthNavigator.js            # Gestion Auth/App stacks
├── contexts/
│   └── AuthContext.js              # Context d'authentification
├── services/
│   ├── auth-service.js             # Service Appwrite Account
│   ├── note-service.js             # Service notes avec userId
│   └── appwrite-config.js          # Client Appwrite
├── screens/
│   ├── AuthScreen.js               # Login/Register
│   ├── HomeScreen.js               # Page d'accueil
│   └── NotesScreen.js              # Liste des notes
├── components/
│   ├── LogoutButton.js             # Bouton déconnexion
│   ├── AddNoteModal.js             # Modal ajout note
│   ├── EditNoteModal.js            # Modal édition note
│   └── NoteItem.js                 # Item de note
└── .env                            # Config Appwrite
```

---

## 🔧 Commandes Utiles

```bash
# Effacer le cache Expo
npm start -- --clear

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# Vérifier les erreurs TypeScript
npx tsc --noEmit

# Build pour production (EAS)
eas build --platform android
eas build --platform ios
```

---

## 🐛 Problèmes Fréquents

### "Cannot find module './contexts/AuthContext'"
→ Vérifiez que le dossier `contexts` existe à la racine du projet
→ Redémarrez le bundler : `npm start -- --clear`

### "AppwriteException: User (role: guests) missing scope"
→ L'utilisateur n'est pas connecté ou la session a expiré
→ Déconnectez-vous et reconnectez-vous

### "Document with the requested ID could not be found"
→ Vérifiez les IDs dans `.env` (DATABASE_ID, COLLECTION_ID)
→ Vérifiez que la collection existe dans Appwrite Console

### Les notes ne se chargent pas
→ Vérifiez que l'attribut `userId` existe dans la collection
→ Vérifiez les permissions de la collection
→ Vérifiez que l'index sur `userId` est activé

### App crash au démarrage
→ Vérifiez le fichier `.env`
→ Vérifiez que toutes les dépendances sont installées : `npm install`
→ Redémarrez avec cache clear : `npm start -- --clear`

---

## 📝 Checklist Avant de Tester

- [ ] Fichier `.env` configuré avec les bons IDs
- [ ] Collection "notes" créée avec tous les attributs
- [ ] Index sur `userId` activé
- [ ] Permissions de collection configurées
- [ ] Email/Password activé dans Auth
- [ ] Dépendances installées (`npm install`)
- [ ] Expo démarré (`npm start`)

---

## 🎓 Concepts Clés Implémentés

1. **Authentication Flow** : Session persistante avec Appwrite Account
2. **Context API** : État global pour l'utilisateur connecté
3. **Protected Routes** : Navigation conditionnelle selon auth
4. **Data Filtering** : Filtrage des notes par `userId`
5. **Empty States** : UX améliorée quand pas de données
6. **Error Handling** : Gestion des erreurs avec messages clairs
7. **Loading States** : Indicateurs de chargement appropriés

---

✅ **Vous êtes prêt à tester votre application Lab 3 !**

Si vous rencontrez des problèmes, consultez `LAB3_IMPLEMENTATION.md` pour plus de détails.
