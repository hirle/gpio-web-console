import URL from 'url';
import GPIO from './model/GPIO';

export default class Api {

    static GetAllGpios(): Promise<GPIO[]> {
        return fetch('/api/gpio')
            .then(Api.checkStatus)
            .then(data => {
                return Api.processInputData(data);
            });
    }

    static processInputData(data: any): GPIO[] {
        if (!Array.isArray(data)) {
            throw new Error('unexpected data, must be an array instead');
        }

        return data.map((elt: any) => GPIO.deserialize(elt))
    }

    static postSetStatus(gpio: GPIO, status: boolean): Promise<void> {

        const requestUrl = URL.format({ pathname: '/api/gpio', query: { id: gpio.id, state: status.toString() } });

        const requestOptions: RequestInit = {
            method: 'PUT'
        };
        return fetch(requestUrl, requestOptions)
            .then(Api.checkStatus);
    }

    static pulse(gpio: GPIO): Promise<void> {
        const requestUrl = `/api/gpio/${gpio.id}/pulse`;
        const requestOptions: RequestInit = {
            method: 'PUT'
        };
        return fetch(requestUrl, requestOptions)
            .then(Api.checkStatus);
    }

    private static checkStatus(response: Response): Promise<any> {
        if (response.ok) {
            return response.status === 204 ? Promise.resolve() : response.json();
        } else {
            const errorMessage = [response.status, response.statusText, response.body ? response.body.toString() : null].join(':');
            throw new Error(errorMessage);
        }
    }

}
