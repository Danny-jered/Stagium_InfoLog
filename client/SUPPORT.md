# Document de support

# Page de connexion (pour agent et admin)

Il y'a pour l'instant une seule page de connexion pour tous (À discuter en réunion).
C'est à la connexion que le système détermine quelle page affichée en fonction de informations de connexion.

## Solution temporaire pour se connecter (pour agent et admin) avec des données mockées

-   Coordonnateur : pour vous connecter en tant qu'admin, entrez `STGI00110011` dans le champs `Code permanent * :` sur la page de connexion.
    Vous pouvez entrer n'importe quoi dans le champs `Mot de passe * :`.
-   Agent: pour vous connecter en tant qu'agent, entrez `AGET00110011` dans le champs `Code permanent * :` sur la page de connexion.
    Vous pouvez entrer n'importe quoi dans le champs `Mot de passe * :`.
-   Étudiant: pour vous connecter en tant qu'étudiant, entrez `ADAD00110011` dans le champs `Code permanent * :` sur la page de connexion.
    Vous pouvez entrer n'importe quoi dans le champs `Mot de passe * :`.
-   Employeur: pour vous connecter en tant qu'employeur, entrez `EMPL00110011` dans le champs `Code permanent * :` sur la page de connexion.
    Vous pouvez entrer n'importe quoi dans le champs `Mot de passe * :`.

# Pages admin et agent (pour agent et admin)

Toutes les interactions (gestion des offres, des étudiants, agents etc..) présentes sur ces pages sont sans effet vu que le backend n'est pas encore prêt. C'est normal si vous cliquez par exemple sur un bouton `Enregistrer` et que les informations ne changent pas.
Pour le moment, quelques données fictives ont été ajouté dans le dossier `./src`.

# Site responsive (pour agent et admin)

Seulement quelques pages sont responsives pour l'instant

# BACKEND ET FRONTENT

## Comment lancer l'application

-   faire `git pull` séparement à la racine du projet (backend) et dans le dossier `client` pour recupérer les dernières modifications
-   Faire `npm install` ou `yarn install` séparement à la racine du projet (backend) et dans le dossier `client` pour installer les dépendances s'il y'a lieu.
-   Lancez le backend en utilisant la commande `yarn start` à la racine du projet (vous verrez un message dans le terminal vous informant que le backend est up et la connexion au db est réussie)
-   Lancez ensuite le frontend en utilisant la commande `yarn start` dans le dossier client
-   Vous pouvez maintenant vous connecter avec les codes
