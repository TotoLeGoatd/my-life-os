# My Life OS

Version 1 · application personnelle autonome, en français.

Une application personnelle en HTML, CSS et JavaScript, sans bibliothèque ni service payant. Les notes et les validations restent dans le stockage local du navigateur. Il n'y a ni compte, ni serveur de données, ni synchronisation entre appareils.

## Lancer l'application

Ouvrez `index.html` dans un navigateur pour utiliser l'application et enregistrer vos données localement.

Pour activer le fonctionnement hors connexion, servez le dossier avec un petit serveur local, puis ouvrez l'adresse affichée. Par exemple, avec Python installé :

```powershell
py -m http.server 8000
```

Ouvrez ensuite `http://localhost:8000`. Le service worker peut alors mettre l'application en cache. Une adresse HTTPS est nécessaire pour installer le site sur un téléphone ; sur iPhone, ouvrez-le dans Safari, touchez **Partager**, puis **Ajouter à l'écran d'accueil**.

## Données et sauvegardes

- **My Brain** : capture guidée par questions, titre automatique, modification, recherche, classements et mots-clés.
- **365 challenges** : cinq actions par jour, une par catégorie, pendant 365 jours (1 825 actions), avec progression, validation et commentaires. Le jour 1 commence à la première ouverture.
- **Progression** : calendrier, jours actifs, séries et avancement par catégorie.
- **Sauvegarder** : télécharge un fichier JSON contenant les notes, commentaires et validations.
- **Restaurer** : importe ce fichier sur le même appareil ou sur un autre. La restauration remplace les données présentes dans ce navigateur.

Les données du site ne quittent pas le navigateur. Une sauvegarde téléchargée est un fichier local à conserver dans un endroit sûr.
