const cookieParser = require('cookie-parser');
const express = require('express');

const { buildContainer, errorHandler } = require('./utils');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Build Handlers
const { authHandlers } = buildContainer();

// Register Middleware
app.use(express.json());
app.use(cookieParser());

// Serve react page
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

// Register API Endpoints
apiRouter.post('/auth/register', authHandlers.registerHandler);
apiRouter.post('/auth/login', authHandlers.loginHandler);
apiRouter.delete('/auth/logout', authHandlers.logoutHandler);

// Register Error Handler
app.use(errorHandler());

app.listen(port, () => console.log(`Listening on port ${port}...`));