const uuid = require("uuid");

const { UserTakenError } = require("../../errors/user-taken");

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
                throw new UserTakenError(
                    `User ${user.userName} already exists`
                );
            }

            store.users.push(user);
        },
    };
}

module.exports = { createMemoryAuthDao };