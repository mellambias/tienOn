import changePage from './index.js';
import { capitalize } from './utils.js';

async function route(event) {
    event.preventDefault();
    const breadcrumb = document.querySelector('#breadcrumb');
    breadcrumb.innerHTML = '';
    const path = this.dataset.href;
    console.log(path);

    fetch(`./pages/${path}.html`)
        .then(response => {
            if (response.status === 200) {
                console.log('respuesta %o', response);
                return Promise.resolve(response.text());
            }
            return Promise.reject(response);
        })
        .then(html => {
            document.querySelector('.col-main').innerHTML = html;
            console.log(breadcrumb);
            breadcrumb.innerHTML = capitalize(path);
            changePage();
            return Promise.resolve(html);
        })
        .catch(error => {
            console.error('Error: %o', error);
            fetch(`./error/${error.status}.html`)
                .then(response => {
                    if (response.status === 200) {
                        return response.text();
                    }
                    return Promise.reject(response);
                })
                .then(html => {
                    document.querySelector('.col-main').innerHTML = html;
                })
                .catch(error => {
                    console.log('No encontrado %o', error);
                });
        });
}
export default route;
