class Connection {
    constructor(endPoint = '/') {
        this.protocol = 'http';
        this.host = '127.0.0.1';
        this.port = '8080';
        this.endPoint = endPoint;
    }

    async create(modelo) {
        console.log('Guardando sobre el API RESTFULL %o', this.endPoint);
        try {
            const response = await fetch(
                this.protocol +
                    '://' +
                    this.host +
                    ':' +
                    this.port +
                    this.endPoint,
                {
                    method: 'POST',
                    body: JSON.stringify(modelo),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            return await response.json();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async update(modelo) {
        console.log('Actualizando sobre el API RESTFULL %o', this.endPoint);
        try {
            const response = await fetch(
                this.protocol +
                    '://' +
                    this.host +
                    ':' +
                    this.port +
                    this.endPoint,
                {
                    method: 'PUT',
                    body: JSON.stringify(modelo),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            return await response.json();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    /**
     *
     */
    async findAll() {
        console.log(
            'Buscando todos los registros %o',
            this.protocol + '://' + this.host + ':' + this.port + this.endPoint
        );
        try {
            const result = await fetch(
                this.protocol +
                    '://' +
                    this.host +
                    ':' +
                    this.port +
                    this.endPoint,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            return await result.json();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findOne(id) {
        console.log(
            'Buscando un registro por id %o',
            this.protocol + '://' + this.host + ':' + this.port + this.endPoint
        );
        try {
            const result = await fetch(
                this.protocol +
                    '://' +
                    this.host +
                    ':' +
                    this.port +
                    this.endPoint +
                    '/' +
                    id,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            return await result.json();
        } catch (error) {
            console.log('Conection.js : %o', error);
            throw error;
        }
    }
}

export default Connection;
