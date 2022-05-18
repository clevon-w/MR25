import { Heading, Container, Text, Stack, Button, Flex, Spacer } from "@chakra-ui/react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"



function MyAccount() {

  const navigate = useNavigate()

  /**
   * state.auth retrieves the states of the user 
   * state.auth.user retrieves the data stored in the paylaod
   */
  const {user} = useSelector((state) => state.auth)
  const {data} = useSelector((state) => state.auth.user)
  

  const toUpdateUser = (e) => {
    navigate('/UpdateUser')
  }

  return (
    <>
    <Container>
      <Stack spacing={8}>
        <Heading>
          My Account
        </Heading>
        <Stack spacing={4}>
          <Flex>
            <Heading size='md'>Personal particulars</Heading>
            <Spacer />
            <Button variant='ghost' size='sm' onClick={toUpdateUser}>Update</Button>
          </Flex>
          <Text>Your personal particulars will be autofilled when you register for events or upload results</Text>
          <Stack spacing={2}>
            <Text>Name: {data.firstName + data.lastName}</Text>
            <Text>DOB: {data.birthDate}</Text>
            <Text>Gender: {data.gender}</Text>
            <Text>NRIC: {data.nric}</Text>
            <Text>E-Mail {data.email}</Text>
            <Text>Institution: {(data.insitution ? data.insitution : 'N/A')}</Text>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Heading size='md'>Settings</Heading>
          <Text>Password: </Text>
        </Stack>
      </Stack>
    </Container>

    </>
  )
}

export default MyAccount