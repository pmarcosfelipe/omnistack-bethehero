const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');

const routes = express.Router();

routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.list);
routes.post('/incidents', IncidentController.create);

module.exports = routes;
