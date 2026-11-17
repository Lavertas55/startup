const { RecordConflictError } = require("../../errors/record-conflict");

function createMongoAuthDao(db) {
    const userCollection = db.collection("user");

    return {
        async findUser(field, value) {
            return userCollection.findOne({ [field]: value });
        },

        async addUser(userName, passwordHash, token) {
            const user = {
                userName: userName,
                password: passwordHash,
                token: token
            };

            if (await this.findUser('userName', user.userName)) {
                throw new RecordConflictError(
                    `User ${user.userName} already exists`
                );
            }

            await userCollection.insertOne(user);
            return user;
        },

        async updateUser(user) {
            await userCollection.updateOne({ userName: user.userName }, { $set: user });
        },

        async updateUserRemoveAuth(user) {
            await userCollection.updateOne({ userName: user.userName }, { $unset: { token: 1 } });
        },
    };
}

module.exports = { createMongoAuthDao };