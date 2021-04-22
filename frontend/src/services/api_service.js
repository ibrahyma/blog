import axios from 'axios';
import { removeData, retrieveData, TOKENID, USERDATA } from './localStorage';

const BASE_API_URL = 'http://localhost:3030';
export const BASE_CLIENT_URL = 'http://localhost:3000';

export const getRessources = name => {
    const url = `${BASE_API_URL}/${name}`
    return axios.get(url).then((response) => response.data)
}

export const getRessource = (name, id) => {
    const url = `${BASE_API_URL}/${name}/${id}`;
    return axios.get(url).then((response) => response.data);
}

export const login = data => {
    const url = `${BASE_API_URL}/login`;
    return axios.post(url, data).then((response) => response.data);
}

export const logout = () => {
    removeData(TOKENID)
    removeData(USERDATA)
}

export const updateRessource = (name, id, data) => {
    const url = `${BASE_API_URL}/${name}/${id}`;
    const token = retrieveData(TOKENID);
    return axios.put(url, data, { headers: { Authorization: `${token}` }}).then((response) => response.data);
}

export const createRessource = (name, data) => {
    const url = `${BASE_API_URL}/${name}`;
    const token = retrieveData(TOKENID);
    return axios.post(url, data, { headers: { Authorization: `${token}` }}).then((response) => response.data);
}

export const deleteRessource = (name, id) => {
    const url = `${BASE_API_URL}/${name}/${id}`;
    const token = retrieveData(TOKENID);
    return axios.delete(url, { headers: { Authorization: `${token}` }}).then((response) => response.data);
}