#!/usr/bin/env node

require('dotenv').config(); // load .env in process.env

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('nodeapi-avanzado:server');
var http = require('http');
var request = require('supertest');
const Advertisement = require('../models/Advertisement');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

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
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**
* API Tests
*/

// A valid JWT required for testing !!!
var JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE1MGEyN2RmMzI5MTRhZDM2ZTRhMGIiLCJpYXQiOjE2MDQ2Nzk3OTEsImV4cCI6MTYwNDg1MjU5MX0.CYShGzovVn04REhurUbNwjwmaefUBYjIyS2fjYCbvO4';

//TEST /api/anuncios
request(app)
  .get('/?token='+JWT)
  .expect('Content-Type', 'text/html; charset=utf-8')
  .expect(200)
  .end(function(err, res) {
    if (err) {
      console.log('Test get\(\'\/api\/anuncios\/\' ERROR -> ',err.message);
    } else {
      console.log('Test get\(\'\/api\/anuncios\/\'): ', res.status);
    }
  });

  //TEST /api/anuncios/:_id?token=JWT
  //Testing a not existing _id
  request(app)
  .get('/api/anuncios/5fa50a26df32914ad36e4a10?token='+JWT)
  .expect('Content-Type', 'application/json; charset=utf-8')
  .expect(200)
  .end(function(err, res) {
    if (err) {
      console.log('Test NON EXISTING _id: get\(\'\/api\/anuncios\/:_id\' (:_id=5fa50a26df32914ad36e4a10) ERROR -> ',err.message);
    } else {
      console.log('Test NON EXISTING _id: get\(\'\/api\/anuncios\/\/5fa50a26df32914ad36e4a10\'): ', res.text);
    }
  });

  //Testing an existing _id
  getOneAdvertisement(); 
  
  async function getOneAdvertisement() {
    try {
      var adv = await Advertisement.findOne();
      request(app)
        .get('/api/anuncios/'+adv._id+'?token='+JWT)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            console.log(`Test EXISTING _id: get\(\'\/api\/anuncios\/:_id\' (:_id=${adv._id}) ERROR: ${err.message}`);
          } else {
            console.log(`Test EXISTING _id: get\(\'\/api\/anuncios\/:_id\' (:_id=${adv._id}) STATUS ${res.text}`);
          }
        });
    } catch (err) {
      console.log('getOneAdvertisement() ERROR: ',err.message);
      return '';
    }  
  }