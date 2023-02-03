class Login extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.error = this.getAttribute('error') || '';
    }

    static get observedAttributes() {
        return ['error'];
    }

    connectedCallback() {
        this.render();
        this.shadow
            .getElementById('login')
            .addEventListener('submit', this.login);
        document.addEventListener('error', event => {
            this.setAttribute('error', event.detail.message);
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.shadow.getElementById(name).textContent = newValue;
    }

    async login(event) {
        event.preventDefault();
        const formData = new FormData(this);
        let formDataJson = Object.fromEntries(formData.entries());
        try {
            const response = await fetch(
                'http://127.0.0.1:8080/api/auth/user/signin',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataJson),
                }
            );
            const data = await response.json();
            if (data?.accessToken != null) {
                sessionStorage.setItem('accessToken', data.accessToken);
                location.href = 'http://localhost:3000/dashboard/';
            } else {
                document.dispatchEvent(
                    new CustomEvent('error', {
                        detail: { message: data.message },
                    })
                );
            }
        } catch (error) {
            document.dispatchEvent(
                new CustomEvent('error', {
                    detail: { message: error },
                })
            );
        }
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                form {
                    border: 1px solid black;
                    margin: 5px;
                    padding: 30px;
                    border-radius:5%;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 5px 5px 2px 0px rgb(0, 0, 0,0.75);
                }
                .col {
                    margin:5px 0;
                    display:flex;
                    width:100%;
                }
                label {
                    font-weight: bold;
                }
                input {
                    min-height: 1.5rem;
                    padding: 0px 1rem;
                    margin: 8px 0;
                }
                .col-right {
                    display:flex;
                    justify-content:flex-end;
                }
                button {
                    min-height: 1.5rem;
                    padding: 0.1rem;
                    font-weight: bold;
                    min-width: 40%;
                    width:40%;
                    margin-top: 10px;
                    box-shadow: 5px 5px 2px 0px rgb(0, 0, 0,0.75);
                }
                .error{
                    color:red;
                }
            </style>
                <form id="login" method="POST">
                    <p id="error" class="error">${this.error}</p>
                    <div class="col">
                        <label for="user">User/Email</label>
                    </div>
                    <div class="col">
                        <input id="user" name="email" type="text" />
                    </div>
                    <div class="col">
                        <label for="password">Password</label>
                    </div>
                    <div class="col">
                        <input id="password" name="password" type="password" />
                    </div>
                    <div class="col-right">
                        <button type="submit">Login</button>
                    </div>
                </form>`;
    }
}

customElements.define('wc-login', Login);
