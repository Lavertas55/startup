const cookieParser = require('cookie-parser');
const express = require('express');

const { buildContainer, errorHandler } = require('./utils');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Build Handlers
const { authHandlers, courseHandlers, studentHandlers } = buildContainer();

// Register Middleware
app.use(express.json());
app.use(cookieParser());

// Serve react page
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

// Register API Endpoints
apiRouter.post('/auth/register', authHandlers.registerHandler.bind(authHandlers));
apiRouter.post('/auth/login', authHandlers.loginHandler.bind(authHandlers));
apiRouter.delete('/auth/logout', authHandlers.logoutHandler);

// Register Class Endpoint
apiRouter.get('/courses', authHandlers.verifyAuth, courseHandlers.getCoursesHandler);
apiRouter.post('/courses', authHandlers.verifyAuth, courseHandlers.addCourseHandler);

// Register Student Endpoint
apiRouter.get('/student/:id', authHandlers.verifyAuth, studentHandlers.getStudentHandler);
apiRouter.get('/student', authHandlers.verifyAuth, studentHandlers.getStudentsHandler);
apiRouter.post('/student', authHandlers.verifyAuth, studentHandlers.addStudentHandler);

// Register Error Handler
app.use(errorHandler());

app.listen(port, () => console.log(`Listening on port ${port}...`));