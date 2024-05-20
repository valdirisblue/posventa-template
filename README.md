# Clean Architecture Demo

### 🏗️ Built With

- nestjs
- mongoose

### 📌 Getting start

```bash
 $ npm install  #or
 $ yarn
```

copy and rename .env.template to .env and fill all necesary params

### Running the project

```bash
# Development mode
$ npm run start   #or
$ yarn start

#  Watch mode
$ npm run start:dev  #or
$ yarn start:dev

#  Production mode
$ npm run start:prod    #or
$ yarn start:prod

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Project structure 📂

```
├── .env.template
├── Readme.md
├── package.json
└── src
    ├── api
    |     ├── controllers
    |     ├── dto
    |     ├── exceptions
    |     ├── interceptors
    |     ├── middlewares
    ├── common
    |     └── constants
    |     └── helpers
    |     └── interfaces
    |
    ├── domain
    |	     └── [....]
    ├── infrastructure
    |           └── databases
    |                  └── mongo
    ├── main.ts
    ├── app.module.ts
```

## API

Documentation: here comes the url

#### Made with love and 🧠
