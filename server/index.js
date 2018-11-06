require('dotenv').config({ path: '../.env' });

const server = require('./server');

// ==========================================================
//  LISTEN

// Clean up on shutdown for nodemon script
// process.once('SIGUSR2', function () {
//   gracefulShutdown(function () {
//     process.kill(process.pid, 'SIGUSR2');
//   });
// });

server.listen(server.get('port'), server.get('host'), error => {
  if (error) {
    console.error('server.listen encountered an error:', error);
    if (error.syscall !== 'listen') {
      throw error;
    }
    const port = process.env.PORT;
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  } else {
  	console.log('----------------------------------------------------\n');
  	console.log('===> 😊  Starting Server . . .');
  	console.log('===>  Environment: ' + process.env.NODE_ENV);
    console.info(`===>  Server listening @ ${server.get('host')}:${server.get('port')}`);
    console.log('\n----------------------------------------------------');
  }
});
