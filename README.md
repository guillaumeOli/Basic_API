# TestOnePoint

## Setup du backend

Lancer la commande docker

`docker run --name fastify_db -e MYSQL_ROOT_PASSWORD=mypassword -d -p 3308:3306 mysql`

Dans l'interface du container se connecter en tant que root

`mysql -u root -p`

Entrer le mdp suivant:

`mypassword`

Dans l'interface du container:

`create database fastify_db;`

`use fastify_db;`


Dans le terminal dans /src/backend:

`npm i drizzle-kit`

`npx drizzle-kit push`

Dans l'interface du container: (Load des data pour tester)

`INSERT INTO products
(name, description, price)
VALUES
("Pork", "Pork chops", 21),
("Cabbage", "green cabbage", 3),
("Beef", "Beef ribs", 19),
("Chicken", "Wings", 17),
("Beans", "Green Beans", 21);`

`INSERT INTO shopping_lists
(name)
VALUES
("List1");`

Dans le terminal

`npm start`

## Setup du frontend

`npm install`
`npm start`



