const uuid = require("uuid");

const { RecordConflictError } = require("../../errors/record-conflict");

function createMemoryAuthDao(store) {
    return {
        async findUser(field, value) {
            if (!value) return null;

            return store.users.find((u) => u[field] === value);
        },

        async addUser(userName, passwordHash, token) {
            const user = {
                _id: uuid.v7(),
                userName: userName,
                password: passwordHash,
                token: token
            }

            if(await this.findUser('userName', user.userName)) {
                throw new RecordConflictError(
                    `User ${user.userName} already exists`
                );
            }

            store.users.push(user);
            return user;
        },
    };
}

module.exports = { createMemoryAuthDao };