async function createUser(userName, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        userName: userName,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);

    return user;
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365, // Set max age to one year
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

module.exports = { findUser, createUser, setAuthCookie };