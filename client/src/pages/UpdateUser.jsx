
import { React } from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Text,
  useToast,
  Select,
  Spinner,
  Button,
  Stack,
  InputGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Box,
  Container,
  Flex,
  Spacer,
  Input,
  InputRightElement 
} from '@chakra-ui/react'
import { update, reset } from '../features/auth/authSlice'

function UpdateUser() {
  /**
   * creating the register form
   */
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  const {data} = useSelector((state) => state.auth.user)

  const [formData, setFormData] = useState({
    _id: data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    gender: data.gender,
    birthDate: data.birthDate,
    nric: data.nric
  })

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )


  const { _id, firstName, lastName, email, gender, birthDate, nric,} = formData

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: "error",
        isClosable: true
      })
    }

  }, [user, isError, isSuccess, message, navigate, dispatch, toast])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      
    }))
  }


  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      _id,
      firstName,
      lastName,
      email,
      gender,
      birthDate,
      nric,
    }

    const args = {
      'id': _id,
      'data': userData
    }

    dispatch(update(args))

    if(isSuccess) {
      navigate('/MyAccount')
    }
  }

  return (
  <>
  <Container>
    <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <Heading>My Account</Heading>
          <Heading size='md'>Personal particulars</Heading>
          <Text fontSize={14}>Your personal particulars will be autofilled when you register for events or upload results.</Text>
          <Flex>
            <Box w='45%'>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input name='firstName' value={firstName} onChange={onChange} />
              </FormControl>
            </Box>
            <Spacer/>
            <Box w='45%'>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input name='lastName' value={lastName} onChange={onChange} />
              </FormControl>
            </Box>  
          </Flex>
          
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input name='email' value={email} onChange={onChange} />
            <FormHelperText>We'll never share your email</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>NRIC / FIN (last 3 dights and ending alphabet)</FormLabel>
            <Input name='nric' value={nric} onChange={onChange} placeholder='789Z' />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Birth Date (DD/MM/YYYY)</FormLabel>
            <Input name='birthDate' value={birthDate} onChange={onChange} placeholder = '01/01/2000'/>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <Select name='gender' placeholder='Gender' onChange={onChange}>
              <option selected={gender == 'Male'} value='Male'>Male</option>
              <option selected={gender == 'Female'} value='Female'>Female</option>
            </Select>
          </FormControl>

          <Button type='submit' colorScheme='telegram' size='lg'>Update</Button>
        </Stack>
    </form>
  </Container>
    
  </>
  )
}
 export default UpdateUser