<img src="https://raw.githubusercontent.com/murshidazher/employee-manager-api/main/docs/images/black-logo.png" width="90px">

# [employee-manager-api](https://github.com/murshidazher/employee-manager-api)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?logo=graphql&logoColor=white)

> 🧑‍💼💼 An employee management system with express.js

## Table of Content

- [employee-manager-api](#employee-manager-api)
  - [Table of Content](#table-of-content)
    - [Pre-requisite](#pre-requisite)
    - [Up and Running](#up-and-running)
  - [LICENSE](#license)

### Pre-requisite

> 💡 We use pnpm as a drop-in replacement for `npm`

1. Install either nvm or asdf to manage your node version.
2. Install the node version mentioned in the `.nvmrc` file.
3. Install `pnpm` globally as package manager,

```sh
npm install -g pnpm
```

### Up and Running

```sh
pnpm i
# copy the .env.example and specify the url
pnpm cpy-env
# run the development server
pnpm i
pnpm build
pnpm --filter core-api start:dev
```

## LICENSE

[MIT](./LICENSE) &copy; [Murshid Azher](https://github.com/murshidazher)
