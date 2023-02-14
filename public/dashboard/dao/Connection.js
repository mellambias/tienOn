class Connection {
    constructor(endPoint = '/') {
        this.endPoint = endPoint;
    }

    async create(modelo) {
        console.log('Guardando sobre el API RESTFULL %o', this.endPoint);
        try {
            const response = await fetch(this.endPoint, {
                method: 'POST',
                body: JSON.stringify(modelo),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async update(modelo) {
        console.log(
            'Actualizando sobre el API RESTFULL %o/%s',
            this.endPoint,
            modelo.id
        );
        try {
            const response = await fetch(`${this.endPoint}/${modelo.id}`, {
                method: 'PUT',
                body: JSON.stringify(modelo),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
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
        try {
            // console.log(
            //     'Connection -> Buscando todos los registros %o',
            //     this.endPoint
            // );
            const result = await fetch(this.endPoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
            // console.log('Resultado recibido', result);
            return await result.json();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findOne(id) {
        // console.log('Buscando un registro por id %s', `${this.endPoint}/${id}`);
        try {
            const result = await fetch(`${this.endPoint}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
            return await result.json();
        } catch (error) {
            console.log('Conection.js : %o', error);
            throw error;
        }
    }
}

export default Connection;
