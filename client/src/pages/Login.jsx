/**
 * Login Page
 */

import {useState, useEffect} from 'react'
import {FaSignInAlt, FaUser} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useToast, Spinner } from '@chakra-ui/react'
import { login , reset } from '../features/auth/authSlice'

/**
 * Collects data from the user and stores it in formData to be used
 */
function Login() {
  const [formData, setFromData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  /**
   * useEffect is called when anything in the dependancy array is changed
   */
   useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: "error",
        isClosable: true
      })
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  /**
   * @param {*} e is the event
   * @returns enables the placeholder to be editted
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
   * @param {*} e 
   * Event listner
   */
  const onSubmit = (e) => {
    e.preventDefault()
    
    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner/>
  }

  /**
   * creating the register form
   */
  return (
    <>
      <section className='header'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit = {onSubmit}>
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
            type='password' 
            className='form-control' 
            id='password' 
            name='password'
            value={password}
            placeholder='Please enter a password'
            onChange={onChange}/> 
          </div>

          <div className="form-group">
            <button type="sumbit" className='btn-submit'>Submit</button>
          </div>
        </form>
    </section>
  </>
  )
}
export default Login
 