# Documentation d'utilisation de l'API

Accès à l'API, visionnage de des différentes bases :
<http://localhost:8000/>

Pour créer une base :
<http://localhost:8000/>
se mettre dans le body et écrire le nom de la base souhaitée (exemple : base01)

Pour visualiser le contenu d'une base :
<http://localhost:8000/base01>
va donc lister les différentes tables dans la base choisie

Pour créer une table dans notre base :
<http://localhost:8000/base01>
se mettre dans le body et écrire le nom de la table souhaitée (exemple : table01)

Pour visualiser le contenu d'une table :
<http://localhost:8000/base01/table01>
va donc lister les différents chemin possible dans la table

Pour créer un modèle de donnée :
<http://localhost:8000/base01/table01/rule>
se mettre dans le body et renvoyer un Json avec les différentes règles

Pour créer de la data :
<http://localhost:8000/base01/table01/data>
/!\/!\/!\ Attention /!\/!\/!\
pour créer de la donnée dans une table il faut bien respecter et avoir défini le modèle de donnée de la table au préalable.
/!\/!\/!\ Attention /!\/!\/!\
se mettre dans le body et inscrire des donnnées qui respecte les règles.
une fois la création de donnée effectuée un ID est donné automatiquement au groupe de donnée en question
