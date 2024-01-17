import axios from 'axios';
const NAME_API = "http://localhost:5030/name";
const AUTH_API = "http://localhost:5030/auth";
const RESOURCE_API = "http://localhost:5030/resource";

export const name = (username,password) => {
    return axios.get(NAME_API, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json'
      },
    });
};

export const authen = (username,password) => {
    return axios.get(AUTH_API, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json'
      },
    });
};

export const resource = (username,password) => {
    return axios.get(RESOURCE_API, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json'
      },
    });
};