/**
 * Login Page
 */

import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useToast, Spinner, Button, Input, InputRightElement, Stack, InputGroup, Center, FormControl, Flex, Text, Box, Container } from '@chakra-ui/react'
import { login , reset, } from '../features/auth/authSlice'

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

  const[show, setShow] = useState(false)

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
  const onChange = (e) => setFromData(e.target.value)
  

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


  const handleClick = () =>{
    setShow(!show)
  }

  const toRegister = (e) =>{
    navigate('/register')
  }

  if (isLoading) {
    return <Spinner/>
  }
  

  /**
   * creating the register form
   */
  return (
    <>
    <Container>

    <Text fontSize='40px'>Login</Text>
    <form onSubmit={onSubmit}>
    <FormControl>
      <Stack spacing={1}>
        <Text>Email</Text>
          <InputGroup>
            <Input value={email} onChange={onChange} />
          </InputGroup>

        <Text>Password</Text>
          <InputGroup size='md'>
            <Input 
             pr='4.5rem'
              type={show ? 'text' : 'password'}
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
 