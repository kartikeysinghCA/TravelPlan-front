import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notify } from '../services/MicroService';

//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigator = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await notify('logout').then((inp) => {
          // Handle the resolved promise here
          localStorage.removeItem('username');
          localStorage.removeItem('password');
          localStorage.removeItem('role');
          localStorage.clear();
          toast(inp);
          navigator('/login');
          window.location.reload();
        });
      } catch (error) {
        console.error('Error during logout:', error);
        toast('An error occurred during logout');
        navigator('/login');
      }
    };

    handleLogout();
  }, [navigator]);

  return (
    <div>
      <br></br>
      <h3 className='text-center'>
        You've successfully logged out, login <a href='/login'>here</a>.
      </h3>
      <ToastContainer />
    </div>
  );
};

export default Logout;
