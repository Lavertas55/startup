const { UserTakenError } = require("../../errors/user-taken");

function createMemoryAuthDao(store) {
    return {
        async findUser(field, value) {
            if (!value) return null;

            return store.users.find((u) => u[field] === value);
        },

        async addUser(user) {
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