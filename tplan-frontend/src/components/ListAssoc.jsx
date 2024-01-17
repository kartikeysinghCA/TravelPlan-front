import React, { useEffect, useState } from 'react'
import { deleteAssoc, listAssoc } from '../services/AssocService'
import {useNavigate} from 'react-router-dom'
import { notify } from '../services/MicroService'

//toast
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const ListAssoc = () => {
    const [assoc, setAssoc]=useState([])
    const navigator=useNavigate();
    const usrname = localStorage.getItem('username');
    const usrpass = localStorage.getItem('password');
    const role = localStorage.getItem('role');
    
    useEffect(()=>{
        listAssoc(usrname,usrpass).then((response)=>{
            setAssoc(response.data);
            console.log(response.data);
        }).catch(error=>{
            navigator('/login')
            console.error("Login issue man",error);
            if(usrname && usrpass){
                notify("invalid").then(inp=>toast(inp));
            }
            else{
                window.alert('Please login to see Associations.');
            }
        })
    },[])

    function addNewAssoc(){
        navigator('/add-assoc');
    }

    async function removeAssoc(id) {
        await deleteAssoc(usrname,usrpass,id);
        // Wait for the delete operation to complete
        // Now, fetch the updated list of associations and navigate
        notify("delete").then(inp=>toast(inp));
        listAssoc(usrname,usrpass)
          .then((response) => {
            setAssoc(response.data);
            navigator('/assoc');
          })
          .catch((error) => {
            console.error(error);
          });
      }

  return (
    <div className='container'>
        <h2 className='text-center'>List of Associations</h2>
        <br/>
        {role && role.toLowerCase()=='role_admin' && (
        <button className='btn btn-success' onClick={addNewAssoc}>Create New</button>)}
        <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                    <th>Association ID</th>
                    <th>Employee ID</th>
                    <th>Travel ID</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    assoc.map(assoc=>
                        <tr key={assoc.assoid}>
                            <td>{assoc.assoid}</td>
                            <td>{assoc.empid}</td>
                            <td>{assoc.trid}</td>
                            <td>
                                {role && role.toLowerCase()=='role_admin' && (
                                <button className='btn btn-danger' onClick={()=>removeAssoc(assoc.assoid)}>Delete</button>
                                )}
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
        <ToastContainer/>
    </div>
  )
}

export default ListAssoc