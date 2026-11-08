export async function apiFetch(input, options) {
    const response = await fetch(input, options);
    if (response.status === 401) {
        window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return response;
}
