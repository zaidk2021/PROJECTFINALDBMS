export default function authHeader() {
    const userStr = localStorage.getItem('user');
    let user = null as { access_token: string } | null;
    if (userStr) user = JSON.parse(userStr);

    if (user && user.access_token) {
        return { 'x-access-token': user.access_token };
    } else {
        return {};
    }
}
