// LISTTRAVEL.JSX FILE
import React, { useEffect, useState } from 'react';
import { deleteTravel, listTravel } from '../services/TravelService';
import { listAssoc } from '../services/AssocService';
import { useNavigate } from 'react-router-dom';
import { notify } from '../services/MicroService'

//toast
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const ListTravel = () => {
  
  const [travel, setTravel] = useState([]);
  const navigator=useNavigate();

  const usrname = localStorage.getItem('username');
  const usrpass = localStorage.getItem('password');
  const role = localStorage.getItem('role');

  useEffect(() => {
    Promise.all([listTravel(usrname,usrpass), listAssoc(usrname,usrpass)])
      .then(([travelResponse, assocResponse]) => {
        const travelData = travelResponse.data.map((travelItem) => {
          const registeredEmployees = assocResponse.data
            .filter((assocItem) => assocItem.trid === travelItem.trid)
            .map((assocItem) => assocItem.empid);

          return { ...travelItem, registeredEmployees };
        });

        setTravel(travelData);
      })
      .catch((error) => {
        console.error("Login issue man",error);
        navigator('/login')
            if(usrname && usrpass){
              window.alert('Invalid Credentials');
            }
        else{
            window.alert('Please login to see Travels.');
        }
      });
  }, []);

  function addNewTravel(){
    navigator('/add-travel')
  }

  async function removeTravel(id) {
    try {
      await deleteTravel(usrname,usrpass,id);
      notify("invalid").then(inp=>toast(inp));
      const [updatedTravelList, updatedAssocList] = await Promise.all([
        listTravel(usrname,usrpass),
        listAssoc(usrname,usrpass),
      ]);
  
      // Update the state with the updated data
      setTravel(updatedTravelList.data);
  
      navigator('/travel');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className='container'>
      <h2 className='text-center'>List of Travel</h2>
      <br />
      {role && role.toLowerCase()=='role_admin' && (
      <button className='btn btn-primary' onClick={addNewTravel}>Create New</button>)}
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Travel ID</th>
            <th>Destination</th>
            <th>Description</th>
            <th>Date</th>
            <th>Registered Employees</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {travel.map((travelItem) => (
            <tr key={travelItem.trid}>
              <td>{travelItem.trid}</td>
              <td>{travelItem.tname}</td>
              <td>{travelItem.tdesc}</td>
              <td>{travelItem.tdate}</td>
              <td>
                {travelItem.registeredEmployees &&
                  travelItem.registeredEmployees.map((employeeId) => (
                    <span key={employeeId}>{employeeId} </span>
                  ))}
              </td>
              <td>
                 {role && role.toLowerCase()=='role_admin' && (
                <button className='btn btn-danger' onClick={()=>removeTravel(travelItem.trid)}>Delete</button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer/>
    </div>
  );
};

export default ListTravel;
