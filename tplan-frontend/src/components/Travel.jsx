import React from 'react'
import {createTravel, listTravel} from '../services/TravelService'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notify } from '../services/MicroService'

//toast
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const Travel = () => {
  const [tname, settname] = useState('')
  const [tdesc, settdesc] = useState('')
  const [tdate, settdate] = useState('')
  const navigator=useNavigate();        

  const usrname = localStorage.getItem('username');
  const usrpass = localStorage.getItem('password');
  const role = localStorage.getItem('role');

  async function saveTravel(e) {
    e.preventDefault();
    const travel = { tname, tdesc, tdate };
  
    try {
      if(role && role.toLowerCase()=="role_admin"){
        const response = await createTravel(usrname,usrpass,travel);
        console.log(response.data);
        await navigator('/travel');
      }
      else if(role && role.toLowerCase()=="role_user"){
        notify("unauth").then(inp=>toast(inp));
      }
      else{
        notify("invalid").then(inp=>toast(inp));
        navigator('/login')
      }
    } catch (error) {
      console.error('Error creating travel:', error);
      if(usrname && usrpass){
        notify("incorrect").then(inp=>toast(inp));
      }
      else{
          window.alert('Please login to add Travel.');
      }
    }
  }

  return (
    <div className='container'>
      <br/>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h2 className='text-center'>Create Travel</h2>
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>Travel Destination</label>
                  <input
                    type="text"
                    placeholder='Enter name'
                    name="tname"
                    value={tname}
                    className='form-control'
                    onChange={(e) => settname(e.target.value)}
                  >                    
                  </input>
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Travel Description</label>
                  <input
                    type="text"
                    placeholder='Enter description'
                    name="tdesc"
                    value={tdesc}
                    className='form-control'
                    onChange={(e) => settdesc(e.target.value)}
                  >                    
                  </input>
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Travel Date</label>
                  <input
                    type="date"
                    placeholder='Enter date'
                    name="tdate"
                    value={tdate}
                    className='form-control'
                    onChange={(e) => settdate(e.target.value)}
                  >                    
                  </input>
                </div>
                <button className='btn btn-success' onClick={saveTravel}>Submit</button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Travel