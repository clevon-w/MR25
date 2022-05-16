/**
 * Register Page
 */

 import {useState, useEffect} from 'react'
import {FormControl, Stack, Input, InputGroup, Center, Button} from '@chakra-ui/react'
 
 /**
  * Collects data from the user and stores it in formData to be used
  */
 function Login() {
     const [formData, setFromData] = useState({
         email: '',
         password: '',
     })
 
     const {email,password} = formData
 
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

        <Button>Submit</Button>
    </FormControl>
    </>
 }
 export default Login
 