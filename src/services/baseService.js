const WebApiBaseUrl = `http://127.0.0.1:8000/api`;

export default class BaseService {

    static getApiUrl() {
        return WebApiBaseUrl;
    }

    static getToken() {
        return 'Bearer ' + window.localStorage.getItem('token');
    }

    static async getTimeSlots() {
        const response = await fetch(`${WebApiBaseUrl}/timeSlots/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.getToken()

            }
        });

        if (response.ok)
            return await response.json();
        else
            return response.ok;

    }

    static async addTimeSlot(timeSlot) {

        const response = await fetch(`${WebApiBaseUrl}/timeSlots/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.getToken()

            },
            body: JSON.stringify(timeSlot)
        });

        if (response.ok)
            return await response.json();
        else
            return response.ok


    }

    static async deleteTimeSlot(timeSlot) {

        const response = await fetch(`${WebApiBaseUrl}/timeSlots/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.getToken()

            },
            body: JSON.stringify(timeSlot)
        });

        if (response.ok)
            return await response.json();
        else
            return response.ok


    }

    static async getAppointments() {

        const response = await fetch(`${WebApiBaseUrl}/appointments/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.getToken()

            }
        });

        if (response.ok)
            return await response.json();
        else
            return response.ok


    }

    static async updateAppointment(appointment) {

        const response = await fetch(`${WebApiBaseUrl}/appointments/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.getToken()

            },
            body: JSON.stringify(appointment)
        });

        if (response.ok)
            return await response.json();
        else
            return response.ok


    }

    j

    static checkLogin() {
        let token = window.localStorage.getItem('token');

        if (token && token !== '' && token.length > 10) {
            console.log('am check login and returning true');

            return true
        }
        return false;

    }

    static logout() {
        return window.localStorage.removeItem('token');
    }

    static async login(user) {

        const authUser = await fetch(`${WebApiBaseUrl}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //,'Authorization': token
            },
            body: JSON.stringify(user)
        });

        if (authUser.ok)
            return await authUser.json();
        else
            return authUser.ok
    }

    static async register(user) {

        const authUser = await fetch(`${WebApiBaseUrl}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (authUser.ok)
            return await authUser.json();
        else
            return authUser.ok
    }

}
