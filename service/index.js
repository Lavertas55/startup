const cookieParser = require('cookie-parser');
const express = require('express');
const uuid = require('uuid');

const { buildContainer, errorHandler } = require('./utils');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Build Handlers
const { authHandlers } = buildContainer();

// Register Middleware
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

// Serve react page
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/login', authHandlers.registerHandler);
apiRouter.post('/auth/login', authHandlers.loginHandler);
apiRouter.delete('/auth/logout', authHandlers.logoutHandler);



app.listen(port, () => console.log(`Listening on port ${port}...`));