
import { React } from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Heading,
  Stack,
  FormControl,
  Text,
  Box,
  Container,
  Flex,
  Spacer,
  Input,
  Button,
} from "@chakra-ui/react";

import { createResult, reset } from "../features/results/resultSlice"



function UploadResults() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  /**
   * state.auth retrieves the states of the user 
   * state.auth.user retrieves the data stored in the paylaod
   */
  const {user} = useSelector((state) => state.auth)
  const {data} = useSelector((state) => state.auth.user)
  const { events, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.events
    )

  const [formData, setFormData] = useState({
    userId: user._id,
    eventId: events._id,
    ageCategory: events.ageCategory,
    institution: events.institution,
    runTiming: '',
    screenshot: '',
    verified: false,
  });

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const {
    ageCategory,
    institution,
    runtiming,
    screenshot,
    verified
  } = formData

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError, message])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const toHome = () => {
    navigate('/')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createResult(formData))
  }
  
  return (
    <>
    <Container>
    <form onSubmit={onSubmit}>
      <Stack spacing={8}>
        <Heading>
          Upload Results
        </Heading>
        <Stack spacing={4}>
          <Text>You may run as often as you like and each time you upload your results within the day,
              the leaderboard will be updated. Your results will be added to the overall leaderboard the following day.
              Note that failure to submit your results before 2359 hrs on the day would render the results invalid. In case of technical
              hitches preventing submission, drop a note to running.route.tracking@gmail.com on the day itself.
          </Text>
          <Flex>
            <Heading size='md'>Personal particulars</Heading>
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

        <Stack>
        <Heading size='sm'>Time clocked</Heading>  
        <Flex>
          <Box w="45%">
            <FormControl isRequired>
              <Input
                name="Hours"
                type="number"
                value={hours}
                min={0} max={99}
                onChange={(value) => setHours(value)}
                placeholder="HH"
              />
            </FormControl>
          </Box>
          <Spacer />
          <Box w="45%">
            <FormControl isRequired>
              <Input
                name="Minutes"
                type="number"
                value={minutes}
                onChange={onChange}
                placeholder="MM"
              />
            </FormControl>
          </Box>
          <Spacer />
          <Box w="45%">
            <FormControl isRequired>
            <Input
                name="Seconds"
                type="number"
                min={0} max={60}
                value={seconds}
                onChange={onChange}
                placeholder="SS"
              />
            </FormControl>
          </Box>
        </Flex>
        <Heading size='sm'>Strava Screenshot</Heading>
        <Button>Attach Screenshot</Button>
        <Stack spacing='1'>
          <Button
            type="submit"
            color="primary.white"
            bg="primary.800"
            size="lg"
          >
            Upload
          </Button>
          <Button variant="ghost" onClick={toHome}>
            Cancel
          </Button>
        </Stack>

        </Stack>
      </Stack>
      </form>
    </Container>
    </>
  )
}

export default UploadResults