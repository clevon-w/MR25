import React from "react"
import { Heading, Container, Text, Stack, Button, Flex, Spacer, HStack } from "@chakra-ui/react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"



function UploadSuccess() {

  const navigate = useNavigate()

  /**
   * state.auth retrieves the states of the user 
   * state.auth.user retrieves the data stored in the paylaod
   */
  const {user} = useSelector((state) => state.auth)
  const {data} = useSelector((state) => state.auth.user)
  const {result} = useSelector((state) => state.result.result)
  

  const formatDate = (uglyDate) => {
    const monthArr = [' Jan ', ' Feb ', ' Mar ', ' Apr ', ' May ', ' Jun ', ' Jul ', ' Aug ', ' Sep ', ' Oct ', ' Nov ', ' Dec ']
    const year = uglyDate.substring(0, 4)
    const month = monthArr[parseInt(uglyDate.substring(5, 7)) - 1]
    const day = uglyDate.substring(8, 10)
    const prettyDate = day + month + year
    return prettyDate
  }

  const toLeaderBoard = () => {
    navigate('/Leaderboard')
  }

  return (
    <>
      <Container>
        <Stack spacing={8} >
          <Text fontWeight={700} fontSize={'2xl'}>Upload Successful!</Text>

          <Stack spacing={4}>
            <Heading size='sm'>Result</Heading>
            <Stack spacing={2}>
              <HStack spacing={4} fontSize={'sm'} >
                <Text fontWeight={700} >Uploaded on:</Text>
                <Text fontWeight={400} >{formatDate(result.createdAt)}</Text>
              </HStack>

              <HStack spacing={4} fontSize={'sm'} >
                <Text fontWeight={700} >Time Clocked:</Text>
                <Text fontWeight={400} >{formatDate(result.runTiming)}</Text>
              </HStack>

              <HStack spacing={4} fontSize={'sm'} >
                <Text fontWeight={700} >Strava Screenshot:</Text>
                <Text fontWeight={400} >{result.screenshot}</Text>
              </HStack>

              <HStack spacing={4} fontSize={'sm'} >
                <Text fontWeight={700} >Category:</Text>
                <Text fontWeight={400} >{result.ageCategory}</Text>
              </HStack>

              <HStack spacing={4} fontSize={'sm'} >
                <Text fontWeight={700} >Verification:</Text>
                <Text fontWeight={400} >{result.verified}</Text>
              </HStack>
            </Stack>
          </Stack>

          <Stack spacing={4}>
            <Flex>
              <Text fontWeight={700} fontSize={'md'}>Personal particulars</Text>
            </Flex>
            
            <Stack spacing={2}>
              <HStack spacing={4} fontSize={'sm'} >
                <Text fontWeight={700} >Name:</Text>
                <Text fontWeight={400} >{data.firstName + ' ' + data.lastName}</Text>
              </HStack>

              <HStack spacing={4} fontSize={'sm'} >
                <Text fontWeight={700} >DOB:</Text>
                <Text fontWeight={400} >{formatDate(data.birthDate)}</Text>
              </HStack>

              <HStack spacing={4} fontSize={'sm'} >
                <Text fontWeight={700} >Gender:</Text>
                <Text fontWeight={400} >{data.gender}</Text>
              </HStack>

              <HStack spacing={4} fontSize={'sm'} >
                <Text fontWeight={700} >NRIC:</Text>
                <Text fontWeight={400} >{data.nric}</Text>
              </HStack>

              <HStack spacing={4} fontSize={'sm'} >
                <Text fontWeight={700} >E-mail:</Text>
                <Text fontWeight={400} >{data.email}</Text>
              </HStack>
            </Stack>
          </Stack>

          {/* <Text fontWeight={700} fontSize={'md'}>Settings</Text>

          <HStack spacing={4} fontSize={'sm'} >
            <Text fontWeight={700} >Password:</Text>
            <Text fontWeight={400} >{data.password}</Text>
          </HStack> */}

        <Button colorScheme="telegram" size='lg' onClick={toLeaderBoard}>
          View LeaderBoard
        </Button>
        </Stack>

        
      </Container>
    </>
  )
}

export default UploadSuccess