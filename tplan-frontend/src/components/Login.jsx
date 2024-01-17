import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authen } from '../services/RoleService'
import { notify } from '../services/MicroService'

//toast
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const Login = () => {
  const [uname, setuname] = useState('')
  const [pass, setpass] = useState('')
  const navigator=useNavigate();        

  async function saveLogin(e) {
    e.preventDefault();
    console.log(uname,pass)
    localStorage.setItem('username', uname);
    localStorage.setItem('password', pass);
        authen(uname,pass).then((response)=>{
          if (response.data.authenticated){
            localStorage.setItem('role',response.data.authorities[0].authority)
            navigator('/travel')
            window.location.reload();
          }
        }).catch(error=>{
          console.error("Login issue man",error);
          navigator('/login')
          if(uname && pass){
            notify("invalid").then(inp=>toast(inp));
        }
        else{
          notify("incorrect").then(inp=>toast(inp));
        }
      })
  }

  return (
    <div className='container'>
      <br/>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h2 className='text-center'>Login</h2>
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>Username</label>
                  <input
                    type="text"
                    placeholder='Enter username'
                    name="uname"
                    value={uname}
                    className='form-control'
                    onChange={(e) => setuname(e.target.value)}
                  >                    
                  </input>
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Password</label>
                  <input
                    type="password"
                    placeholder='Enter password'
                    name="pass"
                    value={pass}
                    className='form-control'
                    onChange={(e) => setpass(e.target.value)}
                  >                    
                  </input>
                </div>

                <button className='btn btn-success' onClick={saveLogin}>Submit</button>
                <p> Not registered? Sign-up <a href='/signup'>here</a></p>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Login