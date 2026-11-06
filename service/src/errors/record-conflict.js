class RecordConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "RecordConflictError";
    }
}

module.exports = { RecordConflictError };