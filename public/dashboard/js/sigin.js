import changePage from './index.js';
const login = () => {
    document.getElementById('login').addEventListener('submit', sigin);
};

async function sigin(env) {
    env.preventDefault();
    const formData = new FormData(this);
    let formDataJson = Object.fromEntries(formData.entries());
    let response = await fetch('http://localhost:8080/api/auth/user/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataJson),
    });
    const { path, accessToken } = await response.json();
    userSession.path = path;
    userSession.accessToken = accessToken;
    console.log('user %o', userSession);
    try {
        response = await fetch(`http://localhost:8080/${userSession.path}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const { name } = await response.json();
        userSession.name = name;
        alert(`Bienvenido ${userSession.name}`);
        window.location = 'http://localhost:3000/dashboard/';
        changePage();
    } catch (error) {
        console.log('Error');
    }
}

export default login;
