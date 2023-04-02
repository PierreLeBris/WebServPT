# Documentation d'utilisation de l'API

## Accès à l'API, visionnage de des différentes bases

### Request

`GET http://localhost:8000/`

### Result

    []

Ou en cas de sauvegarde effectuée contenu de la sauvegarde.

## Pour créer une base

### Request

`POST http://localhost:8000/`

Se mettre dans le body et écrire le nom de la base souhaitée (exemple : base01).

`curl -X POST -d 'base01' http://localhost:8000/`

### Result

    {
        Database created
    }

## Pour visualiser le contenu d'une base

### Request

`GET http://localhost:8000/base01`

Va donc lister les différentes tables dans la base choisie.

### Result

Si aucune table n'est créée 

    []

Si une table à été créée

    

## Pour créer une table dans notre base

### Request

`POST http://localhost:8000/base01`

Se mettre dans le body et écrire le nom de la table souhaitée (exemple : table01).

### Result

    {
        Table created
    }

## Pour visualiser le contenu d'une table

### Request

`GET http://localhost:8000/base01/table01`

Va donc lister les différents chemin possible dans la table.

### Result

    [
        "config",
        "rules",
        "data"
    ]

## Pour créer un modèle de donnée

### Request

`POST http://localhost:8000/base01/table01/rules`

Se mettre dans le body et renvoyer un Json avec les différentes règles.

### Exemple

    {
        "name" : "text",
        "age" : "integer"
    }

### Result

    {
        rules created
    }

## Pour créer de la data

### Request 

`POST http://localhost:8000/base01/table01/data`

### /!\ Attention /!\\

Pour créer de la donnée dans une table il faut bien respecter et avoir défini le modèle de donnée de la table au préalable.

Se mettre dans le body et inscrire des donnnées qui respecte les règles.

Une fois la création de donnée effectuée un ID est donné automatiquement au groupe de donnée en question.

### Result
