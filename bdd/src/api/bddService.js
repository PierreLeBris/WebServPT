import axios from "axios";

const baseURL = 'http://localhost:8000/'

const getBDD = () => {
    return axios({
      method: 'GET',
      url: baseURL
    })
  }

const createBDD = (bddname) => {
    return axios({
        method:'POST',
        url: baseURL,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-type': 'application/json'
        },
        bddname,
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getBDD,
    createBDD
}