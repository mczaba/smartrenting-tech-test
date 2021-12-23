# DOC - back

Chaque route répond avec un json contenant le statut : error ou success, et soit un message dans le cas d'une erreur, soit la donnée voulue dans le cas d'un succès.
Les authorisations sont gérées par les 2 middlewares du fichier middlewares/isAuth.js. le middleware isAuth vérifie que la requête dispose d'un token valide et le middleware checkUser vérifie que l'id utilisateur du token est bien le même userId que celui du training à modifier/supprimer.
la config base de donnée se trouver dans le fichier util/db.js

# DOC - front
Ajout d'un state userId dans le contexte permettant d'afficher ou non les boutons de modification/suppression d'entrainement.
Ajout des composants : 
  - CreateTraining : formulaire permettant de créer un nouvel entrainement
  - TrainingRow : ligne dans la table des entrainements comprenant les données et les boutons de modification / suppression
  - StatsAverage / StatsDateSum / StatsTopTrainers : composants allant chercher les données de statistiques coté back pour les afficher dans la partie stats du dashboard

