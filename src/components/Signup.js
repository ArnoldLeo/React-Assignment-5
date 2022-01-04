import React, { useState } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import './form.css'

function Signup(props) {
    let navToLogin = () => {
        // console.log(props);
        props.history.push('/login')
    }
    const [userData, setuserData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: ''
    })
    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        firstNameError: '',
        lastNameError: ''
    })
    // const [passwordError, setpasswordError] = useState('')

    let updateUser = (event) => {
        setuserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }

    const validateEmail = () => {
        if (userData.email) {
            let regex = /^\S+@\S+$/;
            if (regex.test(userData.email)) {
                setErrors({ ...errors, emailError: '' })
                return true;
            } else {
                setErrors({ ...errors, emailError: "Enter valid email-id" })
                // return false
            }
        } else {
            setErrors({ ...errors, emailError: "Email-id required" })
        }
        return false
    };

    const valiadateName = () => {
        if (!(userData.firstName && userData.lastName)) {
            alert('First and last name cannot be empty')
            // console.log('true');
        }
        else if ((userData.firstName.length > 10)) {
            console.log('first name >10');
            setErrors({ ...errors, firstNameError: "First Name can have Max of 10 characters only", lastNameError: '' })
            return false
        }
        else if (userData.lastName.length > 10) {
            console.log('last name >10');
            setErrors({ ...errors, lastNameError: "Last Name cannot have more than 10 characters", firstNameError: '' })
            return false
        }
        else if (userData.firstName && userData.lastName) {
            // console.log('final name test');
            setErrors({ lastNameError: '', firstNameError: '' })
            return true
        }
    }

    let validateConfirmPassword=()=>{
        if(userData.confirmPassword){
            if(userData.password===userData.confirmPassword){
                setErrors({confirmPasswordError:''})
                return true
            }
            else{
                setErrors({confirmPasswordError:'Confirm Password not matching'})
                return false
            }
        }
        else{
            setErrors({confirmPasswordError:'Confirm Password Required'})
        }
    }

    let validatePassword = () => {
        if (userData.password === '') {
            setErrors({ passwordError: 'Password required' })
            return false
        }
        else if (userData.password) {
            let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            // setErrors({ passwordError: '', confirmPasswordError: '' })
            if (regex.test(userData.password)) {
                setErrors({ passwordError: '', confirmPasswordError: '' })
                return true
            }
            else {
                setErrors({ passwordError: 'Password must have minimum 8characters with atleast one UpperCase letter,one LowerCase letter, one Digit and one Special Chracter', })
            return false
            }
        }
        
    }

    let saveData = (event) => {
        console.log('inside save', userData);
        event.preventDefault()
        if (validateEmail() && valiadateName() && validatePassword() && validateConfirmPassword()) {
            props.getUserData(userData)
            setuserData({
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: '',
                email: ''
            })
            alert("Signup Successfull")
            props.history.push('/login')
        }
    }
    return (
        <div>
            <h1>SignUp</h1>
            <div className='container border' style={{ width: '50%' }}>

                <form>
                    <div class="mb-3">
                        <label className="form-label">Email address</label>
                        <input name='email' type="text" placeholder='Enter Email' value={userData.email} onChange={(event) => { updateUser(event) }} className="form-control" required />
                        {errors.emailError && <div className='errMsg'>{errors.emailError}</div>}
                    </div>
                    <div class="mb-3">
                        <label className="form-label">First Name</label>
                        <input name='firstName' type="text" placeholder='Enter First Name' value={userData.firstName} onChange={(event) => { updateUser(event) }} className="form-control" required />
                        {errors.firstNameError && <div className='errMsg'>{errors.firstNameError}</div>}
                    </div>
                    <div class="mb-3">
                        <label className="form-label">Last Name</label>
                        <input name='lastName' type="text" placeholder='Enter Last Name' value={userData.lastName} onChange={(event) => { updateUser(event) }} required className="form-control" />
                        {errors.lastNameError && <div className='errMsg'>{errors.lastNameError}</div>}
                    </div>
                    <div class="mb-3">
                        <label className="form-label">Password</label>
                        <input name='password' type="password" placeholder='Enter Password' value={userData.password} onChange={(event) => { updateUser(event) }} required className="form-control" />
                        {errors.passwordError && <div className='errMsg'>{errors.passwordError}</div>}
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Confirm Password</label>
                        <input name='confirmPassword' type="password" placeholder='Re-Enter Password' value={userData.confirmPassword} onChange={(event) => { updateUser(event) }} required className="form-control" />
                        {errors.confirmPasswordError && <div className='errMsg'>{errors.confirmPasswordError}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary mt-2" onClick={(event) => { saveData(event) }} >SignUp</button>
                </form>
                <div className='alreadyHaveAccount mt-2' onClick={navToLogin}><h4>Already have an account?,then Login</h4></div>
            </div>
        </div>
    )
}

export default withRouter(Signup)
