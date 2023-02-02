class ElementDetail extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById(
            'element-details-template'
        ).content;
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(template.cloneNode(true));
    }
}

customElements.define('element-details', ElementDetail);

class ElementContainer extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById(
            'element-container-template'
        ).content;
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(template.cloneNode(true));
    }

    connectedCallback() {
        const container = document.getElementById('miContenedor');
        container.innerHTML = `
        <element-details>
            <span slot="element-name">slot</span>
            <span slot="description"
                >A placeholder inside a web component that users
                can fill with their own markup, with the effect
                of composing different DOM trees together.</span
            >
            <dl slot="attributes">
                <dt>name</dt>
                <dd>The name of the slot.</dd>
            </dl>
        </element-details>
        <element-details>
            <span slot="element-name">template</span>
            <span slot="description"
                >A mechanism for holding client- side content that
                is not to be rendered when a page is loaded but may
                subsequently be instantiated during runtime using
                JavaScript.</span
            >
            </element-details>
        <element-details>
            <span slot="description"></span>
        </element-details>`;
    }
}
customElements.define('element-container', ElementContainer);
