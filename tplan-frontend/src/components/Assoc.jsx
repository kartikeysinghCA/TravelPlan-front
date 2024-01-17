import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {createAssoc} from '../services/AssocService'
import { notify } from '../services/MicroService'

//toast
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const Assoc = () => {
  const [empid, setEmpId] = useState('')
  const [trid, setTrId] = useState('')
  const navigator=useNavigate();        
  const usrname = localStorage.getItem('username');
  const usrpass = localStorage.getItem('password');
  const role = localStorage.getItem('role');

  async function saveAssoc(e) {
    e.preventDefault();
    const assoc = { empid, trid };
  
    try {
      if(role && role.toLowerCase()=="role_admin"){
        const response = await createAssoc(usrname,usrpass,assoc);
        console.log(response.data);
        await navigator('/assoc');
      }
      else if(role && role.toLowerCase()=="role_user"){
        notify("unauth").then(inp=>toast(inp));
      }
      else{
        notify("invalid").then(inp=>toast(inp));
        navigator('/login')
      }
    } catch (error) {
      console.error('Error creating association:', error);
      navigator('/login')
    }
  }

  return (
    <div className='container'>
      <br/>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h2 className='text-center'>Create Association</h2>
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>Employee ID</label>
                  <input
                    type="text"
                    placeholder='Enter EmployeeID'
                    name="empid"
                    value={empid}
                    className='form-control'
                    onChange={(e) => setEmpId(e.target.value)}
                  >                    
                  </input>
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Travel ID</label>
                  <input
                    type="text"
                    placeholder='Enter TravelID'
                    name="trid"
                    value={trid}
                    className='form-control'
                    onChange={(e) => setTrId(e.target.value)}
                  >                    
                  </input>
                </div>
                <button className='btn btn-success' onClick={saveAssoc}>Submit</button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Assoc