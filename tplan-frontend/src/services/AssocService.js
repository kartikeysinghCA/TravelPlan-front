import axios from 'axios';

const ASSOC_API_BASE = "http://localhost:5030/api/assoc";

//export const listAssoc = () => axios.get(ASSOC_API_BASE);
//export const createAssoc = (asso) => axios.post(ASSOC_API_BASE,asso);
//export const deleteAssoc = (assoid) => axios.delete(ASSOC_API_BASE+'/'+assoid);

export const listAssoc = (username,password) => {
    return axios.get(ASSOC_API_BASE, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json',
      },
    });
};

export const createAssoc = (username,password,asso) => {
    return axios.post(ASSOC_API_BASE, asso, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json',
      },
    });
};

export const deleteAssoc = (username,password,assoid) => {
    return axios.delete(ASSOC_API_BASE+'/'+assoid, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json',
      },
    });
};