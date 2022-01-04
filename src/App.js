import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [userFormData, setuserFormData] = useState([])
  let getUserData=(userData)=>{
    // console.log(userData);
    let userFormDataCopy=[...userFormData]
    userFormDataCopy.push(userData)
    setuserFormData(userFormDataCopy)
  }
  return (
    <Router>
      <div className="App">
      <Navbar></Navbar>
      <Switch>
      <Route exact path={'/'} ><Home /></Route>
      <Route path={'/login'} ><Login users={userFormData}/></Route>
      <Route path={'/signup'}><Signup getUserData={getUserData}/></Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
