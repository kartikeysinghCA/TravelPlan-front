import React, { useState } from 'react'
import { createEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { notify } from '../services/MicroService'

//toast
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const Employee = () => {
  const [emp_name, setEmpName] = useState('')
  const [emp_age, setEmpAge] = useState('')
  const [emp_salary, setEmpSalary] = useState('')
  const [emp_city, setEmpCity] = useState('')
  const [emp_role, setEmpRole] = useState('')
  const navigator=useNavigate();

  async function saveEmployee(e) {
    e.preventDefault();
    const employee = { emp_name, emp_age, emp_salary, emp_city, emp_role };
  
    try {
      if(emp_name && emp_age && emp_salary && emp_city && emp_role && !Number.isInteger(emp_age) && !isNaN(emp_salary)){
        const response = await createEmployee(employee);
        console.log(response.data);
        await navigator('/login');
      }
      else{
        notify("incorrect").then(inp=>toast(inp));
      }
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  }
  
  return (
    <div className='container'>
      <br/>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h2 className='text-center text-danger'>Sign Up</h2>
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>Name</label>
                  <input
                    type="text"
                    placeholder='Enter name'
                    name="emp_name"
                    value={emp_name}
                    className='form-control'
                    onChange={(e) => setEmpName(e.target.value)}
                  >                    
                  </input>
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Age</label>
                  <input
                    type="text"
                    placeholder='Enter age'
                    name="emp_age"
                    value={emp_age}
                    className='form-control'
                    onChange={(e) => setEmpAge(e.target.value)}
                  >                    
                  </input>
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Salary</label>
                  <input
                    type="text"
                    placeholder='Enter salary'
                    name="emp_salary"
                    value={emp_salary}
                    className='form-control'
                    onChange={(e) => setEmpSalary(e.target.value)}
                  >                    
                  </input>
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>City</label>
                  <input
                    type="text"
                    placeholder='Enter city'
                    name="emp_city"
                    value={emp_city}
                    className='form-control'
                    onChange={(e) => setEmpCity(e.target.value)}
                  >                    
                  </input>
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Employee Role</label>
                  <input
                    type="text"
                    placeholder='Enter role'
                    name="emp_role"
                    value={emp_role}
                    className='form-control'
                    onChange={(e) => setEmpRole(e.target.value)}
                  >                    
                  </input>
                </div>
                <button className='btn btn-success' onClick={saveEmployee}>Submit</button>
                <p> Already registered? Sign-in <a href='/login'>here</a></p>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Employee