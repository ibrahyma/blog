import axios from 'axios';
import { removeData, retrieveData, TOKENID, USERDATA } from './localStorage';

const BASE_URL = 'http://localhost:3030';

export { getRessources, getRessource, login, logout, updateRessource, createRessource, deleteRessource };

function getRessources(name) {
    const url = `${BASE_URL}/${name}`;
    return axios.get(url).then((response) => response.data);
}

function getRessource(name, id) {
    const url = `${BASE_URL}/${name}/${id}`;
    console.log("URL: ", url)
    return axios.get(url).then((response) => response.data);
}

function login(data) {
    const url = `${BASE_URL}/login`;
    return axios.post(url, data).then((response) => response.data);
}

function logout() {
    removeData(TOKENID);
    removeData(USERDATA);
}

function updateRessource(name, id, data) {
    const url = `${BASE_URL}/${name}/${id}`;
    const token = retrieveData(TOKENID);
    return axios.put(url, data, { headers: { Authorization: `${token}` }}).then((response) => response.data);
}

function createRessource(name, data) {
    const url = `${BASE_URL}/${name}`;
    const token = retrieveData(TOKENID);
    return axios.post(url, data, { headers: { Authorization: `${token}` }}).then((response) => response.data);
}

function deleteRessource(name, id) {
    const url = `${BASE_URL}/${name}/${id}`;
    const token = retrieveData(TOKENID);
    return axios.delete(url, { headers: { Authorization: `${token}` }}).then((response) => response.data);
}