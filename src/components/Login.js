import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import './form.css'

function Login(props) {
const [user, setUser] = useState({email:'',password:''})
const [error, setError] = useState({emailError:'',passwordError:''})

    //programatically navigating
    let navToSignup=()=>{
        // console.log(props);
        props.history.push('/signup')
       }
       let update=(event)=>{
          setUser({...user,
            [event.target.name]:event.target.value
          })
       }
       const validateEmail = () => {
        if (user.email) {
            let regex = /^\S+@\S+$/;
            if (regex.test(user.email)) {
                setError({ ...error, emailError: '' })
                return true;
            } else {
                setError({ ...error, emailError: "Enter valid email-id" })
                // return false
            }
        } else {
            setError({ ...error, emailError: "Email-id required" })
        }
        return false
    }
    let validatePassword = () => {
      if (user.password === '') {
          setError({ passwordError: 'Password required' })
          return false
      }
      else if (user.password) {
          let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          // setErrors({ passwordError: '', confirmPasswordError: '' })
          if (regex.test(user.password)) {
              setError({ passwordError: '' })
              return true
          }
          else {
              setError({ passwordError: 'Password must have minimum 8characters with atleast one UpperCase letter,one LowerCase letter, one Digit and one Special Chracter', })
          return false
          }
      }
      
  }
       
       let submit=(event)=>{
         event.preventDefault()
         console.log('submit');
         console.log(user);
         if(validateEmail() && validatePassword()){
           
            props.history.push('/')
            alert("Login Successful!")
         }
       }
    
    return (
      <div>
         <h1>Login</h1>
        <div className='container border' style={{width:'50%'}} >
           
            <form >
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input name='email' type="email" placeholder='Enter your Email-Id' value={user.email} required className="form-control" onChange={(event)=>update(event)} pattern='.+@gmail\.com' />
        {error.emailError && <div className='errMsg'>{error.emailError}</div> }
        </div>
        <div className="mb-3">
          <label  className="form-label">Password</label>
          <input name='password' type="password" placeholder='Enter your Password' value={user.password} required onChange={(event)=>update(event)} className="form-control mb-2"/>
          {error.passwordError && <div className='errMsg'>{error.passwordError}</div> }
        </div>
        {/* {user.error && <div className='errMsg'>{user.error}</div>} */}
        <button type="submit" className="btn btn-primary mt-4" onClick={(event)=>{submit(event)}}>Login</button>
      </form>
      <div className='newUser mt-4' onClick={navToSignup}><h4>Don't have an account? Signup here ! </h4></div>
        </div>
        </div>
    )
}

export default withRouter(Login)
