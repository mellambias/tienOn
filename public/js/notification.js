const notification = () => {
    const showNotification = event => {
        const contenido = `<i class="${event.detail.icon}"></i><p>${event.detail.message}</p><span class="closeNotification"><i class="close-icon"></i></span>`;
        let notification = document.getElementsByClassName('notification')[0];
        if (!notification) {
            notification = document.createElement('div');
            notification.classList.add('notification');
            notification.innerHTML = contenido;
            event.target.appendChild(notification);
            // espera a que se añada al DOM antes de aplicar el estilo animado.
            setTimeout(() => {
                notification.classList.add(event.detail.className);
            }, 1000);
        } else {
            notification.classList.add(event.detail.className);
            notification.innerHTML = contenido;
        }

        const closeButton = document.querySelector('.closeNotification');

        function close() {
            notification.classList.remove(event.detail.className);
            closeButton.removeEventListener('click', close);
            clearTimeout(timerClose);
        }

        closeButton.addEventListener('click', close);

        const timerClose = setTimeout(() => {
            notification.classList.remove(event.detail.className);
            closeButton.removeEventListener('click', close);
            clearTimeout(timerClose);
        }, 5000);
    };

    document.addEventListener('alert', showNotification);
};
export default notification;
