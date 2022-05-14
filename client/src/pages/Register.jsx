/**
 * Register Page
 */
import { Button, Input, Stack, InputGroup, Center,} from '@chakra-ui/react'
import {FormControl} from '@chakra-ui/react'
import {useState, useEffect} from 'react'


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
        setFromData(e.target.value)
    }

    /**
     * 
     * @param {} e 
     * Event listner
     */
    const onSubmit = (e) => {
      e.preventDefault()

      if(password !== password2){
          
      } else {
          const userData={
            firstName,
            lastName,
            email,
            gender,
            birthDate,
            nric,
            password,
          }

          //dispatch(register(userData))
      }
    }

    /**
     * creating the register form
     */
    return <>
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

    <Button>Submit</Button>
    </FormControl>
    </>
}

export default Register
