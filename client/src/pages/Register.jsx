/**
 * Register Page
 */

import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'

/**
 * Collects data from the user and stores it in formData to be used
 */
function Register() {
    const [formData, setFromData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        birthDate: '',
        nric: '',
        password: '',
        password2: '',
    })

    const {firstName, lastName, email, gender, birthDate, nric, password, password2} = formData

    /**
     * 
     * @Returns enables the placeholder to be editted
     * target.name is the field the cursor is in and target.value is the new value entered
     */
    const onChange = (e) => {
        setFromData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    /**
     * 
     * @param {} e 
     * Event listner
     */
    const onSubmit = (e) => {
        e.preventDefault()
    }

    /**
     * creating the register form
     */
    return <>
      <section className='header'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

        <section className='form'>
          <form onSubmit = {onSubmit}>
            <div className="form-group">
              <input 
              type='text' 
              className='form-control' 
              id='firstName' 
              name='firstName'
              value={firstName}
              placeholder='Please enter your first name'
              onChange={onChange}/> 
            </div>

            <div className="form-group">
              <input 
              type='text' 
              className='form-control' 
              id='lastName' 
              name='lastName'
              value={lastName}
              placeholder='Please enter your last name'
              onChange={onChange}/> 
            </div>

            <div className="form-group">
              <input 
              type='email' 
              className='form-control' 
              id='email' 
              name='email'
              value={email}
              placeholder='Please enter your email'
              onChange={onChange}/> 
            </div>

            <div className="form-group">
              <input 
              type='gender' 
              className='form-control' 
              id='gender' 
              name='gender'
              value={gender}
              placeholder='Please enter your gender'
              onChange={onChange}/> 
            </div>

            <div className="form-group">
              <input 
              type='birthDate' 
              className='form-control' 
              id='birthDate' 
              name='birthDate'
              value={birthDate}
              placeholder='Please enter your date of birth (DD/MM/YYYY)'
              onChange={onChange}/> 
            </div>

            <div className="form-group">
              <input 
              type='nric' 
              className='form-control' 
              id='nric' 
              name='nric'
              value={nric}
              placeholder='Please enter last 4 digits of NRIC (eg. 123A)'
              onChange={onChange}/> 
            </div>

            <div className="form-group">
              <input 
              type='password' 
              className='form-control' 
              id='password' 
              name='password'
              value={password}
              placeholder='Please enter a password'
              onChange={onChange}/> 
            </div>

            <div className="form-group">
              <input 
              type='password' 
              className='form-control' 
              id='password2' 
              name='password2'
              value={password2}
              placeholder='Please confirm your password'
              onChange={onChange}/> 
            </div>
            <div className="form-group">
                <button type="sumbit" className='btn-submit'>Submit</button>
            </div>
          </form>
      </section>
    </>
}
export default Register
