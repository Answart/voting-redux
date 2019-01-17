# Voting Redux

A create-react-app where a user can browse existing polls as well as sign up and login to vote or create new polls. It uses the MERN stack with Redux-Saga and PassportJS authentication.

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

```bash
# Install NPM dependencies
$ npm install;cd client;npm install;cd ../server;npm install;cd ..;

# Create a .env file with the following:
NODE_ENV=development
PUBLIC_URL=localhost:8080
HOST=localhost
SECRET=my-super-secret
MONGO_URL=mongodb://<dbuser>:<dbpassword>@<mongodatabase>
PORT=8080

# Start the app
$ npm run start
```

NPM Commands
------------

|Command|Description|
|---|---|
|npm start|Start webpack development server @ **localhost:3000**|
|npm run test|Run tests on all .test. files.|
|npm run build|Build production bundles to **./build** directory|
|npm run server|Start express server @ **localhost:3000** to serve build artifacts from **./build** directory|
