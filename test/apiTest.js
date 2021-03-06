#!/usr/bin/env node
/* eslint-disable no-undef */

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
// review .env variable JWT_TESTING

//TEST /api/anuncios
//without JWT
request(app)
  .get('/api/anuncios')
  .expect('Content-Type', 'application/json; charset=utf-8')
  .expect(200)
  .end(function(err, res) {
    console.group('------ TEST GET /api/anuncios (WHITHOUT token JWT) ------');
    if (err) console.log('*** ERROR => ', err.message);
    console.groupEnd();
});

//with JWT
request(app)
  .get('/api/anuncios?token='+process.env.JWT_TESTING)
  .expect('Content-Type', 'application/json; charset=utf-8')
  .expect(200)
  .end(function(err, res) {
    console.group('------ TEST GET /api/anuncios?token=JWT (VALID token) ------');
    if (err) {
      console.log('*** ERROR => ', err.message);
    } else {
      console.log('*** RESULT => ', res.text);
    }
    console.groupEnd();
  });
  
  //TEST /api/anuncios/:_id?token=JWT
  request(app)
  .get('/api/anuncios/5fa50a26df32914ad36e4a10?token='+process.env.JWT_TESTING)
  .expect('Content-Type', 'application/json; charset=utf-8')
  .expect(200)
  .end(function(err, res) {
    console.group('------ TEST GET /api/anuncios/:_id (NOT VALID :_id) ------');
    if (err) {
      console.log('*** ERROR => ', err.message);
    } else {
      console.log('*** RESULT => ', res.text);
    }
    console.groupEnd();
  });
  
  //Testing an existing _id
  getOneAdvertisement(); 
  
  async function getOneAdvertisement() {
    try {
      var adv = await Advertisement.findOne();
      request(app)
        .get('/api/anuncios/'+adv._id+'?token='+process.env.JWT_TESTING)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          console.group('------ TEST GET /api/anuncios/:_id (VALID :_id) ------');
          if (err) {
            console.log('*** ERROR => ', err.message);
          } else {
            console.log('*** RESULT => ', res.text);
          }
          console.groupEnd();
        });
    } catch (err) {
      console.log('getOneAdvertisement() ERROR: ',err.message);
      return '';
    }  
  }