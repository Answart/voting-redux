# Voting Redux

A create-react-app where a user can browse existing polls as well as sign up and login to vote or create new polls. It uses the MERN stack with Redux-Saga and PassportJS authentication.

## User stories:
* As an authenticated user, I can keep my polls and come back later to access them.
* As an authenticated user, I can share my polls with my friends.
* As an authenticated user, I can see the aggregate results of my polls.
* As an authenticated user, I can delete polls that I decide I don't want anymore.
* As an authenticated user, I can create a poll with any number of possible items.
* As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
* As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
* As an authenticated user, if I don't like the options on a poll, I can create a new option.

## Tech Stack and Key Packages:

CRA aka [create-react-app](https://github.com/facebook/create-react-app)

The [MERN stack](https://www.mongodb.com/blog/post/the-modern-application-stack-part-1-introducing-the-mean-stack):
* [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](https://www.mongodb.com)): Document database – used by back-end applications to store data as JSON
* [**E**xpress.js](http://expressjs.com): Back-end web application framework running on top of Node.js
* [**R**eact.js](https://reactjs.org/): JavaScript library developed by Facebook to build interactive/reactive user interfaces
* [**N**ode.js](https://nodejs.org/en/): JavaScript runtime environment – lets one implement application back-end in JavaScript

### Server Side

* [NodeJS](https://nodejs.org/en/), [ExpressJS](http://expressjs.com), [REST API](https://www.mulesoft.com/resources/api/what-is-rest-api-design)
* [MongoDB](https://www.mongodb.com), [Mongoose](http://www.mongoosejs.com), [mLab](https://mlab.com/)
* [Passport.js](http://www.passportjs.org/)

### Client Side

* [React](https://reactjs.org/) v16, [React Router](https://github.com/ReactTraining/react-router) v4
* [Redux](https://redux.js.org/), [Redux-Saga](https://redux-saga.js.org/), [Redux-Form](https://redux-form.com/7.3.0/) v7.3
* [Material-UI](https://material-ui-next.com/) (-next)
* [D3](https://d3js.org/)
* [Jest](https://facebook.github.io/jest/) v22, [Enzyme](https://github.com/airbnb/enzyme) v3

## App Map

```
server/
    index.js            Server root
    server.js           Server configuration
    config/
        express.js            Set express host/port, headers, bodyparser
        passport.js           Config passport uses, user serialization, etc
        routes.js             Server-side routing from API calls to mongo/passport
    controllers/        Poll and User controllers
    models/             Poll and User models
client/
    public/
    src/
        index.js               Client root
        utils/                 Helper files and __spec__ setup/helper files
        core/
            constants.js          Constants used by reducers/sagas/actions
            history.js            History for routing
            reducers.js           App reducers (users, polls, forms, router)
            sagas.js              App sagas (user and polls)
            store.js              App redux store with saga middleware
            api/                  API functions called by sagas
            polls/                Poll actions/reducer/sagas/selectors and test files
                index.js
                actions.js           Poll actions
                reducer.js           Poll reducer
                sagas.js             Poll sagas
                selectors.js         Poll state selectors
                __spec__/            Spec files to test poll actions/reducer/sagas
            users/                User actions/reducer/sagas/selectors and test files
        views/
            app.js                App root
            components/           Components called by pages
            pages/                App pages
            static/               Assets like logo and background images
            styles/               CSS files
```

## Getting Started

Install:

```bash
# Get the latest snapshot
git clone --depth=1 https://github.com/answart/voting-redux.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install
cd client;npm install;cd ..;
cd server;npm install;cd ..;

# Create a .env file with the following:
HOST=localhost
SECRET=my-super-secret
MONGO_URL=mongodb://USER:PASSWORD@MONGO-DATABASE
PORT=3001

# Start the app
npm run start
```
