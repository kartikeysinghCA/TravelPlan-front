// LISTEMPLOYEE.JSX FILE
import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployee } from '../services/EmployeeService';
import { listAssoc } from '../services/AssocService';
import {useNavigate} from 'react-router-dom';
import { notify } from '../services/MicroService'

//toast
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const ListEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const [assoc, setAssoc] = useState([]);
  const navigator=useNavigate();

  const usrname = localStorage.getItem('username');
  const usrpass = localStorage.getItem('password');
  const role = localStorage.getItem('role');

  useEffect(() => {
    Promise.all([listEmployee(usrname,usrpass), listAssoc(usrname,usrpass)])
      .then(([employeeResponse, assocResponse]) => {
        const employeeData = employeeResponse.data.map((employeeItem) => {
          const registeredTravelPlans = assocResponse.data
            .filter((assocItem) => assocItem.empid === employeeItem.empid)
            .map((assocItem) => assocItem.trid);

          return { ...employeeItem, registeredTravelPlans };
        });

        setEmployee(employeeData);
        setAssoc(assocResponse.data);
      })
      .catch((error) => {
        console.error(error);
        navigator('/login')
        if(usrname && usrpass){
          window.alert('Invalid Credentials');
        }
        else{
            window.alert('Please login to see Employees.');
        }
      });
  }, []);

  function addNewEmployee(){
    navigator('/add-employee')
  }

  async function removeEmployee(id) {
    try {
      await deleteEmployee(usrname,usrpass,id);
      // Wait for the delete operation to complete
      // Now, fetch the updated list of employees and update the state
      notify("delete").then(inp=>toast(inp));
      const updatedEmployeeList = await listEmployee(usrname,usrpass);
      setEmployee(updatedEmployeeList.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className='container'>
      <h2 className='text-center'>List of Employees</h2>
      <br/>
      {role && role.toLowerCase()=='role_admin' && (
      <button className='btn btn-info' onClick={addNewEmployee}>Create New</button>)}
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Age</th>
            <th>City</th>
            <th>Role</th>
            <th>Registered Travel Plans</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employeeItem) => (
            <tr key={employeeItem.empid}>
              <td>{employeeItem.empid}</td>
              <td>{employeeItem.emp_name}</td>
              <td>{employeeItem.emp_salary}</td>
              <td>{employeeItem.emp_age}</td>
              <td>{employeeItem.emp_city}</td>
              <td>{employeeItem.emp_role}</td>
              <td>
                {employeeItem.registeredTravelPlans &&
                  employeeItem.registeredTravelPlans.map((travelPlanId) => (
                    <span key={travelPlanId}>{travelPlanId} </span>
                  ))}
              </td>
              <td>
              {role && role.toLowerCase()=='role_admin' && (
                <button className='btn btn-danger' onClick={() => removeEmployee(employeeItem.empid)}>
                  Delete
                </button>
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

export default ListEmployee;
