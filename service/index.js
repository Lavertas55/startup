const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
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

apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('userName', req.body.userName);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send({ userName: user.userName });
            return;
        }
    }

    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});



app.listen(port, () => console.log(`Listening on port ${port}...`));