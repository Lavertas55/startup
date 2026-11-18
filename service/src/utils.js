const { RecordConflictError } = require("./errors/record-conflict");
const { UnauthorizedError } = require("./errors/unauthorized");
const { BadRequestError } = require("./errors/bad-request");

function errorHandler() {
    return (err, req, res, next) => {
        if (err instanceof RecordConflictError) {
            res.status(409);
        } else if (err instanceof UnauthorizedError) {
            res.status(401);
        } else if (err instanceof BadRequestError) {
            res.status(400);
        } else {
            res.status(500);
        }
        res.send({ type: err.name, msg: err.message });
    };
}

module.exports = { errorHandler };
