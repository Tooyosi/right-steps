import axios from 'axios';
import { BASE_URL } from './links';

class WebService {
    constructor() {
        this.url = BASE_URL
        this.headers = {
            'Content-type': 'application/json'
        }
    }

    errorHandler(result) {
        if (result.response && result.response.status == 401) {
            window.history.replaceState({message:"Session Time Out", isError: true, show: true}, "error", "/signin")
            window.location.replace('/signin')
            return false
        } else {
            return result
        }
    }
    async sendPost(url, data) {
        let result
        try {
            result = await axios({
                method: 'POST',
                url: `${this.url}${url}`,
                withCredentials: true ,
                data
            })
        } catch (error) {
            result = error
        }
        let newRes = this.errorHandler(result)
        return newRes
    }

    async sendGet(url) {
        let result
        try {
            result = await axios({
                method: 'get',
                url: `${this.url}${url}`,
                withCredentials: true ,

            })

        } catch (error) {
            result = error
        }
        let newRes = this.errorHandler(result)
        return newRes
    }

    async sendPut(url, data, id) {
        let result
        try {
            result = await axios({
                method: 'PUT',
                url: `${this.url}${url}/${id}`,
                withCredentials: true ,
                data
            })
        } catch (error) {
            result = error
        }

        let newRes = this.errorHandler(result)
        return newRes
    }
    async sendFile(url, data) {
        let result
        try {
            result = await axios({
                method: 'POST',
                url: `${this.url}${url}`,
                withCredentials: true ,
                data
            })

        } catch (error) {
            result = error
        }


        let newRes = this.errorHandler(result)
        return newRes
    }
    async sendSingleGet(url, id) {
        let result
        try {
            result = await axios({
                method: 'get',
                withCredentials: true ,
                url: `${this.url}${url}/${id}`
            })

        } catch (error) {
            result = error
        }

        let newRes = this.errorHandler(result)
        return newRes
    }

    async sendDelete(url, id) {
        let result
        try {
            result = await axios({
                method: 'DELETE',
                withCredentials: true ,
                url: `${this.url}${url}/${id}`
            })

        } catch (error) {
            result = error
        }



        let newRes = this.errorHandler(result)
        return newRes
    }
}

export default WebService;