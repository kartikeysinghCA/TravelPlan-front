import axios from 'axios';

const NOTIF_BASE = "http://127.0.0.1:5050/api/notif";

//export const notify = (inp) => axios.get(NOTIF_BASE+"/"+inp);

export const notify = async (inp) => {
    try {
      const response = await axios.get(`${NOTIF_BASE}/${inp}`);
      return response.data; // Assuming your API returns the notification message in the response data
    } catch (error) {
      console.error("Error fetching notification:", error);
      return "An error occurred";
    }
  };