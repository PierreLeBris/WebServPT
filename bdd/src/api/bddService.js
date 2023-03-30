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
        data: bddname,
    })
}

const getTable = (bddname) => {
    return axios({
        method: 'GET',
        url: baseURL + bddname
    })
}

const createTable = (bddname, tableName) => {
    return axios({
        method: 'POST',
        url: baseURL + bddname,
        data: tableName
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getBDD,
    createBDD,
    getTable,
    createTable
}