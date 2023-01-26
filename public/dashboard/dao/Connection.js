class Connection {
    constructor(endPoint = '/') {
        this.protocol = 'http';
        this.host = '127.0.0.1';
        this.port = '3306';
        this.endPoint = endPoint;
    }

    save(modelo) {
        console.log('Guardando sobre el API RESTFULL');
        fetch(
            this.protocol + '://' + this.host + ':' + this.port + this.endPoint,
            {
                method: 'POST',
                body: JSON.stringify(modelo),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }
        )
            .then(response => {
                return response.json();
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default Connection;
