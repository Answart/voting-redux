# Voting Redux

A React app where one can browse existing polls as well as sign up and login to vote or create new polls. It uses the MERN stack with Redux-Saga and PassportJS authentication.

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

The [MERN stack](https://www.mongodb.com/blog/post/the-modern-application-stack-part-1-introducing-the-mean-stack):
* [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](https://www.mongodb.com)): Document database – used by back-end applications to store data as JSON
* [**E**xpress.js](http://expressjs.com): Back-end web application framework running on top of Node.js
* [**R**eact.js](https://reactjs.org/): JavaScript library developed by Facebook to build interactive/reactive user interfaces
* [**N**ode.js](https://nodejs.org/en/): JavaScript runtime environment – lets one implement application back-end in JavaScript

### Server Side

* NodeJS, ExpressJS, REST API
* MongoDB, Mongoose, MongoLAB
* Passport.js

### Client Side

* React, React Router v4
* Redux, Redux-Saga, Redux-Form
* Material-UI
* D3

## Project Map



## Getting Started

Install:

```bash
# Get the latest snapshot
git clone --depth=1 https://github.com/answart/voting-redux.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install
cd client
npm install
cd ../server
npm install
cd ..

# Create a .env file with the following:
HOST=localhost
SECRET=my-super-secret
MONGO_URL=mongodb://USER:PASSWORD@MONGO-DATABASE
PORT=3001

# Start the app
npm run start
```
