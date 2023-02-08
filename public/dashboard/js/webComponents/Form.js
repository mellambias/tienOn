class FormComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.form = this.shadow.querySelector('form');
        console.log('Form connect', this.form);
        this.form.addEventListener('submit', this.onSubmit);
        this.form.addEventListener('formdata', () => console.log('formdata'));
        this.form.addEventListener('reset', () => console.log('reset'));
        document
            .querySelector('button[type="submit"]')
            .addEventListener('click', this.onSubmit);
    }

    onSubmit = event => {
        event.preventDefault();
        const formData = new FormData(this.shadow.querySelector('form'));
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log(data);
    };
    render() {
        this.shadow.innerHTML = `
            <form><slot></slot></form>
        `;
    }
}

customElements.define('wc-form', FormComponent);
