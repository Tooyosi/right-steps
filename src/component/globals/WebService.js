import axios from 'axios';

class WebService {
    constructor() {
        this.url = "http://localhost:3001/"
        this.headers = {
            'Content-type': 'application/json'
        }
    }

    async sendPost(url, data) {
        let result
        try {
            result = await axios({
                method: 'POST',
                url: `${this.url}${url}`,
                
                data
            })
        } catch (error) {
            result = error
        }
        
        return result
    }

    async sendGet(url) {
        let result
        try {
            result = await axios({
                method: 'get',
                url: `${this.url}${url}`
                
            })

        } catch (error) {
            result = error
        }
        return result
    }

    async sendPut(url, data, id) {
        let result
        try {
            result = await axios({
                method: 'PUT',
                url: `${this.url}${url}/${id}`,
                data
            })
        } catch (error) {
            result = error
        }
        
        return result
    }
    async sendFile(url, data) {
        let result
        try {
            result = await axios({
                method: 'POST',
                url: `${this.url}${url}`,
                data
            })

        } catch (error) {
            result = error
        }

        
        return result
    }
    async sendSingleGet(url, id) {
        let result
        try {
            result = await axios({
                method: 'get',
                url: `${this.url}${url}/${id}`                
            })

        } catch (error) {
            result = error
        }
        let sentResult = this.responseHandler(result)
        return sentResult
    }

    async sendDelete(url, id) {
        let result
        try {
            result = await axios({
                method: 'DELETE',
                url: `${this.url}${url}/${id}`                
            })

        } catch (error) {
            result = error
        }

        
        return result
    }
}

export default WebService;