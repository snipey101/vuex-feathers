const feathers = require('feathers/client')
const socketio = require('feathers-socketio/client');
const hooks = require('feathers-hooks');
const io = require('socket.io-client');
const socket = io('http://localhost:3030/');
const app = feathers();

export default {

  app.configure(feathers.socketio(socket))
      .configure(feathers.hooks())
      // Use localStorage to store our login token
  .configure(feathers.authentication({
    storage: window.localStorage
  }))

  this.getApp = function(){
    return app;
  }

};
