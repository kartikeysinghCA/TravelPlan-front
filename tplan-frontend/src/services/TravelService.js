import axios from 'axios';

const TRAVEL_API_BASE = "http://localhost:5030/api/travel";

//export const listTravel = () => axios.get(TRAVEL_API_BASE);
//export const createTravel = (trv) => axios.post(TRAVEL_API_BASE, trv);
//export const deleteTravel = (trid) => axios.delete(TRAVEL_API_BASE+'/'+trid);

export const listTravel = (username,password) => {
    return axios.get(TRAVEL_API_BASE, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json'
      },
    });
  };

export const createTravel = (username,password,trv) => {
    return axios.post(TRAVEL_API_BASE, trv ,{
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json'
      },
    });
  };

  export const deleteTravel = (username,password,trid) => {
    return axios.delete(TRAVEL_API_BASE+'/'+trid, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json'
      },
    });
  };