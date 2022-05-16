/**
 * Login Page
 */

import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useToast, Spinner, Button, Input, Stack, InputGroup, Center, FormControl } from '@chakra-ui/react'
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
  }, [user, isError, isSuccess, message, navigate, dispatch, toast])

  /**
   * @param {*} e is the event
   * @returns enables the placeholder to be editted
   * target.name is the field the cursor is in and target.value is the new value entered
   */
  const onChange = (e) => {
    setFromData(e.target.value)
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
      <Center fontSize='40px'>Login</Center>
      <FormControl onSubmit={onSubmit}>
        <Stack spacing={3}>
          <InputGroup>
            <Input value={email} onChange={onChange} placeholder='Enter your email' />
          </InputGroup>

          <InputGroup>
            <Input value={password} onChange={onChange} placeholder='Password' />
          </InputGroup>

        </Stack>

        <Button onClick={onSubmit} >Submit</Button>
      </FormControl>
  </>
  )
}
export default Login
 