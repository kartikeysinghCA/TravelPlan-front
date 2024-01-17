import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ListTravel from './components/ListTravel'
import ListEmployee from './components/ListEmployee'
import ListAssoc from './components/ListAssoc'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Employee from './components/Employee'
import Assoc from './components/Assoc'
import Travel from './components/Travel'
import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'

function App() {

  return (
    <>
    <BrowserRouter>
      <Header/>
        <Routes>
          {/* http:localhost:3000*/}
          <Route path='/'  element={<Login/>}></Route>
          <Route path='/travel' element={<ListTravel/>}></Route>
          <Route path='/add-travel' element={<Travel/>}></Route>
          <Route path='/employee' element={<ListEmployee/>}></Route>
          <Route path='/add-employee' element={<Employee/>}></Route>
          <Route path='/assoc' element={<ListAssoc/>}></Route>
          <Route path='/add-assoc' element={<Assoc/>}></Route>
          <Route path='/login'  element={<Login/>}></Route>
          <Route path='/logout'  element={<Logout/>}></Route>
          <Route path='/signup'  element={<Signup/>}></Route>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
