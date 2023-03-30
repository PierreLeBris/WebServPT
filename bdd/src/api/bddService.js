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

const createRule = (bddName, tableName, rulesData) => {
    return axios({
        method: 'POST',
        url: baseURL + bddName + '/' + tableName + '/rules',
        data: rulesData
    })
}

const getRule = (bddName, tableName) => {
    return axios({
        method: 'GET',
        url: baseURL + bddName + '/' + tableName + '/rules',
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getBDD,
    createBDD,
    getTable,
    createTable,
    createRule,
    getRule
}