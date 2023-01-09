const login = () => {
    document.getElementById('login').addEventListener('submit', sigin);
};

async function sigin(env) {
    env.preventDefault();
    const formData = new FormData(this);
    let formDataJson = Object.fromEntries(formData.entries());
    console.log(formDataJson);
    let response = await fetch('http://localhost:8080/api/auth/user/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataJson),
    });
    const { accessToken } = await response.json();
    console.log(accessToken);
    if (accessToken) {
        try {
            response = await fetch('http://localhost:8080/api/admin/users', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(await response.json());
        } catch (error) {
            console.log('Error');
        }
    }
}

export default login;
