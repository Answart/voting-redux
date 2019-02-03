const bodyParser = require('body-parser');
const cors = require('cors');


module.exports = (app, ENV_PRODUCTION) => {
  let host = '';
  let proxyPort = '';
  let urlPort = '';


  if (ENV_PRODUCTION) {
    // TODO
    host = (!process.env.PUBLIC_URL) ? 'https://answart-voting-app.herokuapp.com' : process.env.PUBLIC_URL;
  } else {
    host = (!process.env.HOST) ? ('localhost' || '127.0.0.1') : process.env.HOST;
    proxyPort = '8080';
    urlPort = '3000';
  }

  app.set('host', host);
  app.set('port', process.env.PORT || proxyPort);
  const url = `${host}${urlPort ? ':' + urlPort : ''}`;

  app.options('*', cors());
  app.use(cors({ 'credentials': false, 'origin': '*' }));

  // Prevent errors from Cross Origin Resource Sharing, by setting headers to allow CORS with middleware:
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', url);
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PATCH,PUT,DELETE');
    res.setHeader('Access-Control-Expose-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Max-Age', '1800');
    // Pass to next layer of middleware
    next();
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  if (ENV_PRODUCTION) {
    console.log('===> 🚦  Note: In order for authentication to work in production');
    console.log('===>           you will need a secure HTTPS connection');
  } else if (process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('dev'));
  }
};