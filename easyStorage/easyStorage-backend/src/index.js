const config = require('config');
const logger = require('./logger');
const mongoose = require('mongoose');
const app = require('./server');

const port = config.port || 3001;

if(!config.has('database')) {
    logger.error('No database config found!');
    process.exit();
}

mongoose
    .connect(`mongodb+srv://${config.database.user}:${config.database.password}@${config.database.host}`)
    .then(() => logger.info('MongoDB connection has been established succesfully'))
    .catch(err => {
        logger.err(err);
        process.exit();
    });

app.listen(port, () => {
    logger.info(`App listening at localhost: ${port}`);
})
