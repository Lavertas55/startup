export async function loginOrRegister(endpoint, userName, password, onLogin, onError) {
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ userName: userName, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response?.status === 200) {
        localStorage.setItem('userName', userName);
        onLogin(userName);
    } else {
        const body = await response.json();
        onError(`⚠ Error: ${body.msg}`)
    }
}