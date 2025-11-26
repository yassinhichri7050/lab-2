# ✅ Checklist de Vérification - Lab 3

Utilisez cette checklist pour vérifier que tous les fichiers et configurations sont en place.

## 📁 Fichiers Créés

### Services
- [x] `services/auth-service.js` - Service d'authentification

### Contextes
- [x] `contexts/AuthContext.js` - Context d'authentification avec useAuth()

### Navigation
- [x] `navigation/AuthNavigator.js` - Navigation Auth/App stacks

### Écrans
- [x] `screens/AuthScreen.js` - Écran Login/Register

### Composants
- [x] `components/LogoutButton.js` - Bouton de déconnexion

### Documentation
- [x] `LAB3_IMPLEMENTATION.md` - Documentation complète
- [x] `QUICKSTART.md` - Guide de démarrage rapide
- [x] `CHANGES_SUMMARY.md` - Résumé des changements
- [x] `VERIFICATION_CHECKLIST.md` - Cette checklist

---

## ✏️ Fichiers Modifiés

### Core
- [x] `App.tsx` - AuthProvider + AuthNavigator

### Screens
- [x] `screens/HomeScreen.js` - useAuth() + LogoutButton + nom utilisateur
- [x] `screens/NotesScreen.js` - Filtrage par userId + Empty state

### Services
- [x] `services/note-service.js` - getNotes(userId) + createNote(data, userId)

### Components
- [x] `components/AddNoteModal.js` - useAuth() + passage userId

---

## 🔧 Configuration Appwrite

### Projet Appwrite
- [ ] Endpoint configuré dans `.env`
- [ ] Project ID configuré dans `.env`
- [ ] Database ID configuré dans `.env`
- [ ] Collection ID configuré dans `.env`

### Collection "notes"
- [ ] Attribut `title` (string, required)
- [ ] Attribut `content` (string, required)
- [ ] Attribut `userId` (string, required, **indexé**)
- [ ] Attribut `createdAt` (string, required)
- [ ] Attribut `updatedAt` (string, required)

### Permissions Collection
- [ ] Role: Any → Create, Read, Update, Delete
  OU
- [ ] Role: Users → Create, Read, Update, Delete

### Authentification
- [ ] Email/Password activé dans Auth Settings
- [ ] (Optionnel) Email Verification désactivée pour dev

---

## 🧪 Tests Fonctionnels

### 1. Inscription
- [ ] Remplir nom, email, password
- [ ] Cliquer "Register"
- [ ] Redirection automatique vers Home
- [ ] Message "Welcome, [Nom]!" affiché

### 2. Connexion
- [ ] Se déconnecter
- [ ] Remplir email, password
- [ ] Cliquer "Login"
- [ ] Redirection vers Home
- [ ] Nom utilisateur affiché

### 3. Création de Notes
- [ ] Cliquer "View Notes"
- [ ] Voir message empty state (si première note)
- [ ] Cliquer "+ Add Note"
- [ ] Remplir titre et contenu
- [ ] Note apparaît immédiatement

### 4. Filtrage Multi-Utilisateurs
- [ ] Créer des notes avec utilisateur 1
- [ ] Se déconnecter
- [ ] Créer un compte utilisateur 2
- [ ] Créer des notes avec utilisateur 2
- [ ] Vérifier que seules les notes de l'utilisateur 2 apparaissent
- [ ] Se reconnecter avec utilisateur 1
- [ ] Vérifier que seules les notes de l'utilisateur 1 apparaissent

### 5. Session Persistante
- [ ] Se connecter
- [ ] Fermer complètement l'app
- [ ] Rouvrir l'app
- [ ] Vérifier connexion automatique (pas d'écran Auth)
- [ ] Notes chargées automatiquement

### 6. Empty State
- [ ] Créer un nouveau compte
- [ ] Aller sur NotesScreen
- [ ] Vérifier message : "You don't have any notes yet."
- [ ] Vérifier message : "Tap the button to create your first note."

### 7. Bouton Logout
- [ ] Cliquer bouton "Logout" (en-tête)
- [ ] Vérifier Alert de confirmation
- [ ] Confirmer
- [ ] Redirection vers AuthScreen

### 8. Édition de Notes
- [ ] Cliquer sur une note
- [ ] Modifier titre/contenu
- [ ] Sauvegarder
- [ ] Changements visibles immédiatement

### 9. Suppression de Notes
- [ ] Supprimer une note
- [ ] Note disparaît de la liste
- [ ] Vérifier avec autre utilisateur que note n'apparaît pas

### 10. Pull-to-Refresh
- [ ] Sur NotesScreen, tirer vers le bas
- [ ] Loading indicator apparaît
- [ ] Notes rechargées

---

## 🐛 Tests d'Erreurs

### Inscription
- [ ] Tenter inscription avec email existant → Message d'erreur clair
- [ ] Tenter inscription avec champs vides → Validation côté client
- [ ] Tenter inscription avec email invalide → Message d'erreur

### Connexion
- [ ] Tenter connexion avec mauvais mot de passe → Message d'erreur
- [ ] Tenter connexion avec email inexistant → Message d'erreur
- [ ] Tenter connexion avec champs vides → Validation côté client

### Notes
- [ ] Tenter création note avec champs vides → Validation côté client
- [ ] Tenter création note sans connexion → Message d'erreur approprié

---

## 🚀 Performance

### Chargement
- [ ] Écran de chargement affiché pendant vérification session
- [ ] Pas de flash entre Auth et App screens
- [ ] Notes chargées rapidement (grâce à l'index userId)

### UX
- [ ] Loading indicators pendant requêtes
- [ ] Messages d'erreur clairs et contextuels
- [ ] Confirmations avant actions destructrices
- [ ] Transitions fluides entre écrans

---

## 📱 Build & Déploiement

### Local
- [ ] `npm start` fonctionne sans erreur
- [ ] `npm run android` fonctionne (si Android setup)
- [ ] `npm run ios` fonctionne (si iOS setup)
- [ ] Pas d'erreurs dans la console

### EAS (Optionnel)
- [ ] `eas-cli` installé
- [ ] `eas login` réussi
- [ ] `eas build:configure` complété
- [ ] Build Android réussi
- [ ] Build iOS réussi

---

## 🔍 Code Quality

### Imports
- [ ] Tous les imports sont corrects
- [ ] Pas d'imports inutilisés
- [ ] Chemins relatifs cohérents

### Hooks
- [ ] `useAuth()` utilisé correctement (dans composants fonctionnels)
- [ ] `useEffect` avec dépendances correctes
- [ ] Pas de boucles infinies

### État
- [ ] Loading states gérés
- [ ] Error states gérés
- [ ] Empty states gérés

### Sécurité
- [ ] Pas de credentials hardcodés
- [ ] `.env` utilisé pour config
- [ ] Pas de logs sensibles en production

---

## 📚 Documentation

### Code
- [ ] Commentaires clairs
- [ ] Noms de variables descriptifs
- [ ] Fonctions bien nommées

### Fichiers
- [ ] README/Documentation à jour
- [ ] Guide de démarrage clair
- [ ] Résumé des changements documenté

---

## ✅ Résultat Final

**Si tous les items sont cochés :**
🎉 **Votre application Lab 3 est complète, testée et prête pour la production !**

**Si des items ne sont pas cochés :**
1. Consultez `LAB3_IMPLEMENTATION.md` pour les détails
2. Consultez `QUICKSTART.md` pour la configuration
3. Consultez `CHANGES_SUMMARY.md` pour comprendre les changements

---

## 🆘 Aide Rapide

### Commandes Utiles
```bash
# Redémarrer avec cache clear
npm start -- --clear

# Réinstaller dépendances
rm -rf node_modules && npm install

# Vérifier les erreurs TypeScript
npx tsc --noEmit

# Voir les logs
npx react-native log-android
npx react-native log-ios
```

### Fichiers à Vérifier en Cas de Problème
1. `.env` - Configuration Appwrite
2. `App.tsx` - Point d'entrée
3. `navigation/AuthNavigator.js` - Logique de navigation
4. `contexts/AuthContext.js` - État d'authentification
5. `services/auth-service.js` - Appels API Appwrite

---

**Date de vérification :** _____________________

**Vérifié par :** _____________________

**Statut :** [ ] ✅ Tous les tests passent  [ ] ⚠️ Certains tests échouent  [ ] ❌ Problèmes majeurs
