const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
const path = require('path');
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');

const logger = require('./logger');
const authHandler = require('./auth/authHandler');
const authenticationByJWT = require('./auth/authenticate');

const angularAppPath = path.join(__dirname, '..', 'public', 'angular');

const app = express();

// app.use(cors());

app.use(express.json());

app.use(morgan('combined', { stream: { write: message => logger.info(message) }}));


app.use('/', express.static(angularAppPath));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(YAML.load('./docs/openapi.yaml')));

app.use('/login', authHandler.login);
app.use('/refresh', authHandler.refresh);
app.use('/logout', authHandler.logout);

app.use('/items', require('./item/item.routes'));
app.use('/users', require('./user/user.routes'));
app.use('/history', authenticationByJWT, require('./history/history.routes'));

// app.get('*', (req, res) =>{
//     res.sendFile(angularAppPath + '/index.html');
// });

app.use((err, req, res, next) => {
    logger.error(`ERROR ${err.statusCode}: ${err.message}`);
    res.status(err.statusCode).json({
        hasError: true,
        message: err.message
    });
});

// const apiWrapper = express();
// apiWrapper.use('/api', app);

module.exports = app;