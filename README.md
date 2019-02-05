[travis]: https://travis-ci.org/Answart/voting-redux
[dependency]: https://david-dm.org/Answart/voting-redux
[snyk]: https://snyk.io/test/github/Answart/voting-redux
[coveralls]: https://coveralls.io/github/Answart/voting-redux
[MIT]: https://github.com/Answart/voting-redux/blob/master/LICENSE.md

<p align="center">
  <img src="https://user-images.githubusercontent.com/4269260/51295762-ffac9000-19cd-11e9-8507-52efd3e8a138.png" width="550" title="Pollslist Page">
</p>

# Voting Redux

[![Build Status](https://travis-ci.org/Answart/voting-redux.svg?branch=master)][travis]
[![dependencies Status](https://david-dm.org/Answart/voting-redux/status.svg?path=client)][dependency]
[![Known Vulnerabilities](https://snyk.io/test/github/Answart/voting-redux/badge.svg)][snyk]
[![Coverage Status](https://coveralls.io/repos/github/Answart/voting-redux/badge.svg)][coveralls]
[![MIT](https://img.shields.io/github/license/Answart/voting-redux.svg)][MIT]

A react app where a user can browse existing polls as well as sign up and login to vote or create new polls. It uses the **MERN** stack with **Redux-Saga** and **PassportJS** authentication.

User stories
------------

* As an authenticated user, I can keep my polls and come back later to access them.
* As an authenticated user, I can see the aggregate results of my polls.
* As an authenticated user, I can delete polls that I decide I don't want anymore.
* As an authenticated user, I can create a poll with any number of possible items.
* As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
* As an unauthenticated or authenticated user, I can see the results of polls in chart form.

Tech Stack and Key Packages
---------------------------

CRA aka [create-react-app](https://github.com/facebook/create-react-app)

The [MERN stack](https://www.mongodb.com/blog/post/the-modern-application-stack-part-1-introducing-the-mean-stack):
* [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](https://www.mongodb.com)): Document database – used by back-end applications to store data as JSON
* [**E**xpress.js](http://expressjs.com): Back-end web application framework running on top of Node.js
* [**R**eact.js](https://reactjs.org/): JavaScript library developed by Facebook to build interactive/reactive user interfaces
* [**N**ode.js](https://nodejs.org/en/): JavaScript runtime environment – lets one implement application back-end in JavaScript

### Server Side

* [NodeJS](https://nodejs.org/en/): Open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side
* [Express](http://expressjs.com): Fast, unopinionated, minimalist web framework for node
* [REST API](https://www.mulesoft.com/resources/api/what-is-rest-api-design)
* [MongoDB](https://www.mongodb.com): Official MongoDB driver for Node.js
* [Mongoose](http://www.mongoosejs.com): MongoDB object modeling tool designed to work in an asynchronous environment
* [mLab](https://mlab.com/): Cloud database service
* [secure-password](https://github.com/emilbayes/secure-password): Argon2id Password Hashing
* [Passport.js](http://www.passportjs.org/): Simple, unobtrusive authentication for Node.js

### Client Side

* [React](https://reactjs.org/): JavaScript library for building user interfaces
* [React Router](https://github.com/ReactTraining/react-router): Declarative routing for React
* [Redux](https://redux.js.org/): Predictable state container for JavaScript apps
* [Redux-Saga](https://redux-saga.js.org/): Saga middleware for Redux to handle Side Effects
* [Redux-Form](https://redux-form.com/7.4.2/): Higher order component decorator for forms using Redux and React
* [Material-UI](https://material-ui.com/): React components that implement Google's Material Design
* [D3](https://d3js.org/): JavaScript library for visualizing data using web standards
* [Jest](https://facebook.github.io/jest/): Javascript testing
* [Enzyme](https://github.com/airbnb/enzyme): React testing utility
* [Coveralls.io](https://coveralls.io): Provide updates and statistics on projects' code coverage

App Map
-------

```
server/
    index.js            Server root
    server.js           Server configuration
    config/
        express.js            Set express host/port, headers, bodyparser
        passport.js           Config passport uses, user serialization, etc
        routes.js             Server-side routing from API calls to mongo/passport
        passport-strategies/  Authentication files for passports (local, facebook, etc)
    controllers/        Poll and User controllers
    models/             Poll and User models
client/
    public/
    src/
        index.js               Client root
        utils/                 __test__ setup files
        core/
            constants.js          Constants used by reducers/sagas/actions
            history.js            History for routing
            reducers.js           App reducers (users, polls, forms, router)
            sagas.js              App sagas (user and polls)
            store.js              App redux store with saga middleware
            helpers/              Helper functions used by api/reducers in users/polls
            polls/
                index.js
                actions.js           Poll actions
                sagas.js             Poll sagas
                reducer.js           Poll reducer
                api.js               API calls made by polls
                selectors.js         Poll state selectors
                __test__/            Test files to test poll actions/sagas/reducer
            users/                User actions/reducer/sagas/api/selectors and test files
        views/
            app.js                App root
            components/           Components called by pages with their test files
            pages/                App pages with test files
            static/               Assets like logo and background images
            styles/               CSS files
```

Getting Started
---------------

Create your own server. I used [mLab.com](https://mlab.com). Create a user on that server.

Create a .env file in the root directory:
```bash
# .env
NODE_ENV=development
PUBLIC_URL=localhost:8080
HOST=localhost
PORT=8080
SECRET=my-super-secret
MONGODB_URI=mongodb://<dbuser>:<dbpassword>@<mongodatabase>
```

If you want to call coveralls coverage locally, create a .coveralls.yml file in the root dir with the following:
```bash
# .coveralls.yml
repo_token: <TOKENFROMCOVERALLSIO>
service_name: travis-ci
```

One can also define the variables in the repo on [travi.ci.org](https://travis-ci.org) so coveralls is run in the travis scripts:
```bash
COVERALLS_REPO_TOKEN=<TOKENFROMCOVERALLSIO>
COVERALLS_SERVICE_NAME=travis-ci
```

Current local startup:
```bash
## Install all NPM dependencies
$ npm run setup

# Launch app locally
$ npm run start:dev
```

App will be live locally @ [**localhost:3000**](http://localhost:3000/).

App Screenshots
---------------

<p align="center">
  <img src="https://user-images.githubusercontent.com/4269260/51296194-c117d500-19cf-11e9-81a8-c0b15867579f.png" width="350" height="350" title="Home Page">
  <img src="https://user-images.githubusercontent.com/4269260/51296228-f8868180-19cf-11e9-8fd1-ba959d155792.png" width="350" height="350" alt="Account Page">
  <img src="https://user-images.githubusercontent.com/4269260/51295802-29fe4d80-19ce-11e9-93b2-e70788d3ddcc.png" width="350" height="350" alt="Vote Popup">
  <img src="https://user-images.githubusercontent.com/4269260/51295814-413d3b00-19ce-11e9-9e38-089a9254e7af.png" width="350" height="350" alt="Poll Page">
</p>

NPM Commands
------------

| Command | Description |
| ------- | ----------- |
| npm run setup | Install NPM dependencies |
| npm run clean | Remove dependency folders |
| npm run build | Build production bundles to **./build** directory |
| npm test | Run tests on all .test. files |
| npm run coverage | View test coverage |
| npm run server:dev | Start server locally @ **localhost:8080** |
| npm run client:dev | Start client locally @ **localhost:3000** |
| npm run start:dev | Launch client w/server locally @ **localhost:3000** |
