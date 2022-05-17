/**
 * Login Page
 */

import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useToast, Spinner, Button, Input, InputRightElement, Stack, InputGroup, Center, FormControl, Flex, Text, Box, Container } from '@chakra-ui/react'
import { login , reset, } from '../features/auth/authSlice'

function Login() {
  const [formData, setFormData] = useState({
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

  const[show, setShow] = useState(false)

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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    
    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  const handleClick = () =>{
    setShow(!show)
  }

  const toRegister = (e) =>{
    navigate('/register')
  }

  if (isLoading) {
    return <Spinner/>
  }
  
  return (
    <>
    <Container>
      <Text fontSize='40px'>Login</Text>
      <form onSubmit={onSubmit}>
        <FormControl>
          <Stack spacing={1}>
            <Text>Email</Text>
            <InputGroup>
              <Input name='email' value={email} onChange={onChange} />
            </InputGroup>

            <Text>Password</Text>
            <InputGroup size='md'>
              <Input 
                name='password'
                value={password}
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                onChange={onChange}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Button type='submit' colorScheme = 'telegram' size='lg'>Login</Button>
            <Button variant='ghost' onClick={toRegister}>No account? Create account here.</Button>
          </Stack>
        </FormControl>
      </form>
    </Container>
  </>
  )
}
export default Login
 