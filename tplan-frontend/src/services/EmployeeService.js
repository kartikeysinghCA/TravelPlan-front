import axios from 'axios';
const EMPLOYEE_API_BASE = "http://localhost:5030/api/employees";

//export const listEmployee = () => axios.get(EMPLOYEE_API_BASE);
//export const createEmployee = (emp) => axios.post(EMPLOYEE_API_BASE, emp);
//export const deleteEmployee = (empid) => axios.delete(EMPLOYEE_API_BASE+'/'+empid);

export const listEmployee = (username,password) => {
    return axios.get(EMPLOYEE_API_BASE, {
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            'Content-Type': 'application/json'
        },
    });
};

export const createEmployee = (emp) => {
    return axios.post(EMPLOYEE_API_BASE, emp, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

export const deleteEmployee = (username,password,empid) => {
    return axios.delete(EMPLOYEE_API_BASE+'/'+empid, {
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            'Content-Type': 'application/json'
        },
    });
};