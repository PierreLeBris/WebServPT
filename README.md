# WebServPT
Projet Final Web Service Pierre et Thomas

Requête :

    http://localhost:8000 : 

        POST create bdd
        GET bdd
    
    http://localhost:8000/:BddName :

        POST create table
        GET tables
        DELETE bdd

    http://localhost:8000/:BddName/:TableName :

        GET paths (rules + data)

        /config :
            no path

        /rules :
            POST create rules (structure des données de la table)
            GET rules
            PUT /* TODO */
            DELET /* TODO ? */

        /data :
            POST add data to table
            GET data

            /:id
                PUT /* TODO */
                DELETE /* TODO */
        
