/**
 * Register Page
 */
import { React } from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useToast, Select, Spinner, Button, Stack, InputGroup, Center, FormControl, Text, Box, Container } from '@chakra-ui/react'
import { register, reset } from '../features/auth/authSlice'
import { Input, InputRightElement, } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'

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
    insitution: '',
  })

  const { firstName, lastName, email, gender, birthDate, nric, password, password2, insitution } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const [show, setShow] = useState(false)

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

  const toLogin = (e) => {
    navigate('/login')
  }

  const handleClick = () => {
    setShow(!show)
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
        password,
        insitution
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
  <Container>
    <Text fontSize='40px'>Create Account</Text>
    <FormControl onSubmit={onSubmit}>
    <Stack spacing={0}>
        <Flex>
          <Box w='100%'>
            <Text>First Name</Text>
            <Input value={firstName} onChange={onChange} />
          </Box>
          <Box w='100%'>
            <Text>Last Name</Text>
            <Input value={lastName} onChange={onChange} />
          </Box>
          
        </Flex>
        
        <Text>Email</Text>
        <Input value={email} onChange={onChange} />

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

        <Text>Confirm Password</Text>
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

        <Text>NRIC / FIN (last 3 dights and ending alphabet)</Text>
        <Input value={nric} onChange={onChange} placeholder='789Z' />

        <Text>Birth Date (DD/MM/YYYY)</Text>
        <Input value={birthDate} onChange={onChange} placeholder = '01/01/2000'/>

        <Text>Gender</Text>
        <Select placeholder='Gender'>
          <option value={gender}>Male</option>
          <option value={gender}>Female</option>
        </Select>

        <Flex>
          <Text>Institution(if applicable)</Text>
          <Spacer />
          <Text as='cite'>Optional</Text>
        </Flex>
        <Input value={insitution} onChange={onChange} />

        <Button colorScheme='telegram' onClick={onSubmit} size='lg'>Create Account</Button>
        <Button variant = 'ghost' onClick={toLogin}>Already have an account? Login here.</Button>        
    </Stack>
    </FormControl>
  </Container>
    
  </>
  )
}

export default Register
