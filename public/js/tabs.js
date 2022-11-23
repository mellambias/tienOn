export const tabs = () => {
    const tabs = [...document.getElementsByClassName('tab')];
    const tabContents = document.querySelectorAll('.tabs div');

    //controlador del evento click
    function changeTab(evento) {
        const currentTab = evento.target.hasAttribute('data-tabid')
            ? evento.target.dataset.tabid
            : evento.target.parentElement.dataset.tabid;
        tabs.forEach(tab => {
            if (tab.dataset.tabid == currentTab) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        tabContents.forEach(item => {
            if (item.id == currentTab) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // establece los controladores para los tabs
    tabs.forEach(element => {
        element.addEventListener('click', changeTab);
    });
};

// ejecutar cuando el dom se carga

document.addEventListener('DOMContentLoaded', tabs);
