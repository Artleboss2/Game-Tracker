# 🎮 Game Tracker

Une application mobile React Native pour suivre les stats de tes jeux favoris en temps réel.

## 📱 Aperçu

Game Tracker te permet de rechercher n'importe quel joueur sur plusieurs jeux, de sauvegarder ton historique de recherches et de te fixer des objectifs personnels.

## ✨ Fonctionnalités

- 🔍 **Recherche de joueurs** — Trouve les stats de n'importe quel joueur par pseudo
- 🎯 **Multi-jeux** — Fortnite, Minecraft et Valorant supportés
- 📊 **Historique** — Tes 20 dernières recherches sauvegardées localement
- 🏆 **Objectifs** — Fixe-toi des objectifs et suis ta progression
- 💾 **Stockage local** — Données sauvegardées sur l'appareil avec AsyncStorage

## 🕹️ Jeux Supportés

| Jeu | Stats disponibles | API utilisée |
|-----|-------------------|--------------|
| 🎯 Fortnite | Wins, Kills, Matches, K/D, Win Rate | [fortnite-api.com](https://fortnite-api.com) |
| ⛏️ Minecraft | Username, UUID | [api.minetools.eu](https://api.minetools.eu) |
| 🔫 Valorant | Username, Tag, Région, Niveau | [api.henrikdev.xyz](https://api.henrikdev.xyz) |

## 🛠️ Technologies

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/) — Navigation par onglets
- [Axios](https://axios-http.com/) — Requêtes API
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) — Stockage local

## 🚀 Installation

### Prérequis
- Node.js installé
- Expo Go sur ton téléphone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Étapes

```bash
# Cloner le repo
git clone https://github.com/Artleboss2/GameTracker.git
cd GameTracker

# Installer les dépendances
npm install

# Lancer le projet
npx expo start
```

Scanne le QR code avec **Expo Go** sur ton téléphone.

## 🔑 Configuration API

### Fortnite
1. Va sur [fortnite-api.com](https://fortnite-api.com)
2. Génère une clé API gratuite
3. Dans `screens/SearchScreen.js`, remplace :
```javascript
const FORTNITE_API_KEY = 'YOUR_API_KEY';
```

### Minecraft & Valorant
Aucune clé requise — les APIs sont publiques.

## 📁 Structure du projet

```
GameTracker/
├── App.js                  # Navigation principale
├── screens/
│   ├── HomeScreen.js       # Accueil — sélection du jeu
│   ├── SearchScreen.js     # Recherche de joueurs
│   ├── HistoryScreen.js    # Historique des recherches
│   └── GoalsScreen.js      # Objectifs personnels
└── package.json
```

## 👤 Auteur

**Artleboss2** — [github.com/Artleboss2](https://github.com/Artleboss2)

## 📄 Licence

MIT
