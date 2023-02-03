class Controller {
    constructor(model, vista) {
        this.model = model;
        this.vista = vista;
    }

    async loadData() {
        const data = await this.model.findAll();
        console.log('Send event -> %o', data);
        document.dispatchEvent(
            new CustomEvent(`loadContactData`, {
                detail: { data },
            })
        );
    }
}

export default Controller;
