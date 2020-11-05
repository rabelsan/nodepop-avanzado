<h1 align="center">Welcome to Nodepop: the tiny Wallapop 👋</h1>
<p>
  <a href="https://github.com/rabelsan/nodepop" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@rabelsan/nodepop.svg">
  </a>
</p>

## Install

```sh
npm install @rabelsan/nodepop
```

## Configure environment variables

Copy .env.example to .env and review the settings.

```sh
cp .env.example .env
```

## Load initial data

You can load the database with initial data with:

```sh
npm run init-db
```

**Warning! this script delete database contents before the load.**

Use in production only in the first deployment.

## Usage

```sh
npm start
```

## Development start

```sh
npm run dev
```

## API Methods

### Authentication

POST /api/authenticate {body: email:"example@domain.com", password: "xxxx"}

If the user credentials (email & password), are correct, it will return a valid JWT
Otherwise it will return an error

HTTP/1.1 200 OK
  {
    "tokenJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
                eyJfaWQiOiI1ZjlkYTk4MzNlMzAyMTMzNTZkOTdlMjEiLCJpYXQiOjE2MDQ1MTU3NjIsImV4cCI6MTYwNDUxNTc2N30.
                YPoZWhnZxm1R3SK5Ei_xFB9_eXA073nYL-cBZfO4lrE"
  }

### List of advertisements

GET /api/anuncios

  JWT Authorization parameter required. Options:
  
  GET /api/anuncios (body:
        {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        eyJfaWQiOiI1ZjlkYTk4MzNlMzAyMTMzNTZkOTdlMjEiLCJpYXQiOjE2MDQ1MTg2NTQsImV4cCI6MTYwNDY5MTQ1NH0.
        eoF7TvqS0Ray0ZOyC9T-EMuXpr0pXkAcLB3zu_fa3vk)
  
  GET /api/aununcios (header: 
        {key: "Authorization" value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        eyJfaWQiOiI1ZjlkYTk4MzNlMzAyMTMzNTZkOTdlMjEiLCJpYXQiOjE2MDQ1MTg2NTQsImV4cCI6MTYwNDY5MTQ1NH0.
        eoF7TvqS0Ray0ZOyC9T-EMuXpr0pXkAcLB3zu_fa3vk}
  
  GET /api/anuncios (query string)
        api/authenticate?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        eyJfaWQiOiI1ZjlkYTk4MzNlMzAyMTMzNTZkOTdlMjEiLCJpYXQiOjE2MDQ1MTg2NTQsImV4cCI6MTYwNDY5MTQ1NH0.
        eoF7TvqS0Ray0ZOyC9T-EMuXpr0pXkAcLB3zu_fa3vk

  HTTP/1.1 200 OK 
  [
    {
      "sale": true,
      "tags": [
        "bicicletas",
        "bycicles",
        "trek",
        "madone"
      ],
      "_id": "5f5a6ae91be10bf7d4a1956a",
      "name": "Trek Madone SLR7",
      "price": 5800,
      "photo": "images/bike-trek-madone-SLR7.jpg"
    }
  ]
  
  HTTP/1.1 401 Unauthorized
    {
      "error": "no token provided"
    }
  
  HTTP/1.1 401 Unauthorized 
    {
      "error": "jwt expired"
    } 

Example filters:

* http://localhost:3000/api/anuncios?price=20
* http://localhost:3000/api/anuncios?price=-20
* http://localhost:3000/api/anuncios?price=20-
* http://localhost:3000/api/anuncios?price=20-1500
* http://localhost:3000/api/anuncios?tag=bike
* http://localhost:3000/api/anuncios?tag=bike%20trek
* http://localhost:3000/api/anuncios?sale=true
* http://localhost:3000/api/anuncios?price=-6000&tag=bike%20trek&sale=true
* http://localhost:3000/api/anuncios?limit=2
* http://localhost:3000/api/anuncios?skip=20&limit=10
* http://localhost:3000/api/anuncios?sort=name
* http://localhost:3000/api/anuncios?sort=name%20price
* <http://localhost:3000/api/anuncios?fields=name%20-_id> (Only name filed excluding the _id)

### Retrieves one advertisement

GET /api/anuncios/_id

  {
    "result": {
    "sale": false,
    "tags": [
      "guantes",
      "globes",
      "bicicleta",
      "bycicle"
    ],
    "_id": "5f5a6ae91be10bf7d4a1956b",
    "name": "Guantes Bluegrass Manatee",
    "price": 12,
    "photo": "images/guantes-bluegrass-manatee.jpg",
    "__v": 0
  }

### Create advertisement

POST /api/anuncios/upload file: {'photo=../casco-Dexter-Proton-Negan.jpg'}
                     body: { name: 'casco-Dexter-Proton-Negan', sale: 'true', price: '60', tags: [ 'casco', 'moto' ]}
  
  {
    "result": {
        "sale": true,
        "tags": [
            "casco",
            "moto"
        ],
        "_id": "5f5b9b0df9d13e2d0907582c",
        "name": "casco-Dexter-Proton-Negan",
        "price": 60,
        "photo": "images/ad_27942a04-233f-428a-905a-a793d2c847d3_casco-Dexter-Proton-Negan.jpg",
        "__v": 0
    }
  }

### Update advertisement

PUT /api/anuncios/<_id> body: { name: "Casco NEGRO Dexter Proton Negan" }

  {
    "result": {
        "sale": true,
        "tags": [
            "casco",
            "moto"
        ],
        "_id": "5f5b9b0df9d13e2d0907582c",
        "name": "Casco NEGRO Dexter Proton Negan",
        "price": 60,
        "photo": "images/ad_27942a04-233f-428a-905a-a793d2c847d3_casco-Dexter-Proton-Negan.jpg",
        "__v": 0
    }
  }


### Delete advertisement

DELETE /api/anuncios/<_id>

Returns: HTTPCode 200

## How to start a local mongodb instance for development

```sh
./bin/mongod --dbpath ./data/db --directoryperdb
```

## APIDOC (Requires to start the application first)

<p>
  <a href="http://localhost:3000/apidoc/index.html" target="_blank">API Reference</a>
</p>

## Author

👤 **Ramón Beltrán**

* Github: [@rabelsan](https://github.com/rabelsan)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
