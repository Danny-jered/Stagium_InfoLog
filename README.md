# Stagium InfoLog

## Outils requis pour développer ou évoluer ce logiciel

Sur votre ordinateur personnel, vous devez installer les outils suivants:

- [NodeJS](https://nodejs.org/en/download/) (important pour le back-end)

## APIs disponibles:

Base de l'url : `http://localhost:8000/` ou `http://localhost:<PORT>/` où es le numéro du PORT sur lequel roule le serveur.

### Réponses:

- 201
  utilisateur ajouté

- 400
  requête invalide

- 409
  existe déjà

### Ajouter un utilisateur (**api/auths**):

1- Coordonnateur (admin) : `http://localhost:5000/api/auths/register-admin` en utilisant une méthode POST avec un **body**

- Connection :

- Frontend : `yarn start`

- Backend: `heroku local`

```
{
   "code": "STGI00110011",
   "password": "0000",
}
```

2- Agent : `http://localhost:5000/api/auths/register-agent` en utilisant une méthode POST avec un **body**:

```
{
   "code": "AGET00110011",
   "password": "0000",
}
```

3- Étudiant : `http://localhost:5000/api/auths/register-student` en utilisant une méthode POST avec un **body**:

```
{
   "code": "ADAD00110011",
   "password": "0000",
}
```

4- Employeur : `http://localhost:5000/api/auths/register-company` en utilisant une méthode POST avec un **body**:

```
{
   "code": "EMPL00110011",
   "password": "0000",
}
```

Exemple de **body**:

```
{
    "nom": "Dawson",
    "prenom": "David",
    "code": "AAAA22334455",
    "password": "0000",
    "email": "email@email.com",
    "telephone": "+1 445-666-666-4444",
    "location": "49 ch stagium, Montreal, Quebec",
    "universite": "UQAM"
}
```
