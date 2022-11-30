export const tabs = rootElement => {
    if (!rootElement) {
        rootElement = document;
    }
    console.log(document.getElementsByTagName('title').item(0).outerText);
    const tabsElements = [...rootElement.getElementsByClassName('tab')];
    const tabContents = rootElement.querySelectorAll('.tabs div');
    console.log(tabsElements);

    //controlador del evento click
    function changeTab(evento) {
        const currentTab = evento.target.hasAttribute('data-tabid')
            ? evento.target.dataset.tabid
            : evento.target.parentElement.dataset.tabid;
        console.log('%o %s', tabsElements, currentTab);
        tabsElements.forEach(tab => {
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
    tabsElements.forEach(element => {
        element.addEventListener('click', changeTab);
    });
};
