// Third party modules.
const express = require('express');
const cors = require('cors')
require('dotenv').config();

// Local Modules.
const router = require('./routes/index');

// Application.
class App {
  /**
   * @memberof App
   * @description App Constructor.
   * @returns {App}
  **/
  constructor() {
    this.server = express()
    this.middlewares();
    this.routes();
  }

  /**
   * @memberof App
   * @description Middlewares.
   * @returns {void}
  **/
  middlewares() {
    this.server
      .use(cors())
      .use(express.json());
  }

  /**
   * @memberof App
   * @description Routes.
   * @returns {void}
  **/
  routes() {
    this.server.use('/', router);
  }
}

module.exports = new App().server;