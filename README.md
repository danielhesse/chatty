<h1 align="center">
Chatty

![Badge](https://img.shields.io/static/v1?label=DH&message=DOSOMETHINGGREAT&color=0070f3&style=<0070f3>&logo=rocket)
</h1>

### Description

Chatty is a simple real-time customer service chat, widget style as a floating icon on the screen.

This is an MVC application, you can access the chat screen at ```/pages/client``` and the admin screen at ```/pages/admin``` (its content is only visible after receiving contact from a customer)

### Technologies

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [Socket.io](https://socket.io/)

### Getting Started

Before you begin, you will need to have the following tools installed on your machine:
- [Git](https://git-scm.com)

The project can be built with npm or yarn, so choose one of the approach bellow in case you don't have any installed on your system.

Npm is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer.
- [Node.js v16.14.0](https://nodejs.org/) or heigher.

Yarn is a package manager created by the Facebook team and seems to be faster than npm in general.
- [Yarn v1.22.5](https://yarnpkg.com/) or heigher.

Also, it’s good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/).

### :information_source: How to run

Follow the instructions below to download and use the project from this repository:

```bash
# Clone this repository using SSH
$ git clone git@github.com:danielhessell/chatty.git
# or clone using https
$ git clone https://github.com/danielhessell/chatty.git

# Go into the repository
$ cd chatty

# Install dependencies
$ yarn

# Run migrations
$ yarn typeorm migration:run --dataSource ./src/database/index.ts

# Run project
$ yarn dev:server
```

---

Made with :blue_heart: by Daniel Hessel :wave:
