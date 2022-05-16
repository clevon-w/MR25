/**
 * Register Page
 */

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useToast, Spinner, Button, Input, Stack, InputGroup, Center, FormControl } from '@chakra-ui/react'
import { register, reset } from '../features/auth/authSlice'

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

  const { firstName, lastName, email, gender, birthDate, nric, password, password2 } = formData

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
   * onChange is called when the user types in the input fields
   * @param {*} e is the event
   */
  const onChange = (e) => {
    setFromData(e.target.value)
  }

  /**
   * onSubmit is called when the user clicks the submit button to register
   * @param {*} e is the event
   */
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        isClosable: true
      })
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        gender,
        birthDate,
        nric,
        password
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner/>
  }

  /**
   * creating the register form
   */
  return (
  <>
    <Center fontSize='40px'>Please register an account</Center>
    <FormControl onSubmit={onSubmit}>
    <Stack spacing={3}>
      <InputGroup>
        <Input value={firstName} onChange={onChange} placeholder='firstName' />
        <Input value={lastName} onChange={onChange} placeholder='lastName' />
      </InputGroup>

      <InputGroup>
        <Input value={email} onChange={onChange} placeholder='email' />
      </InputGroup>

      <InputGroup>
        <Input value={gender} onChange={onChange} placeholder='Gender' />
      </InputGroup>

      <InputGroup>
        <Input value={birthDate} onChange={onChange} placeholder='Birth Date' />
      </InputGroup>

      <InputGroup>
        <Input value={nric} onChange={onChange} placeholder='Last 4 characters of NRIC eg. 123X' />
      </InputGroup>

      <InputGroup>
        <Input value={password} onChange={onChange} placeholder='Password' />
      </InputGroup>

      <InputGroup>
        <Input value={password2} onChange={onChange} placeholder='Re-enter Password' />
      </InputGroup>

    </Stack>

    <Button onClick={onSubmit} >Submit</Button>
    </FormControl>
  </>
  )
}

export default Register
