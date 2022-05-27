
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
  HStack,
  SimpleGrid,
  GridItem,
  NumberInput,
  NumberInputField, 
  useToast,
  FormHelperText
} from "@chakra-ui/react";
// import { FiImage } from 'react-icons/fi'
import { createResult, reset } from "../features/results/resultSlice"
// import FileUpload from '../components/FileUpload';
// import { useForm } from 'react-hook-form';



function UploadResults() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  /**
   * state.auth retrieves the states of the user 
   * state.auth.user retrieves the data stored in the paylaod
   */
  const {user} = useSelector((state) => state.auth)
  const {data} = useSelector((state) => state.auth.user)
  const { events } = useSelector(
    (state) => state.events
  )
  const { results, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.results
  )

  // category and institution is hard coded at the moment
  // as we only have one event
  const [formData, setFormData] = useState({
    userId: data._id,
    eventId: '62864db1e76d2b7a270da2df',
    firstName: data.firstName,
    lastName: data.lastName,
    ageCategory: data.registeredEvents[0]['62864db1e76d2b7a270da2df'].category,
    institution: data.registeredEvents[0]['62864db1e76d2b7a270da2df'].institution,
    runTiming: '',
    runDate: '',
    runDistance: '',
    // screenshot: null,
    verified: false,
  });

  const [runTime, setRunTime] = useState({
    hours: '',
    minutes: '',
    seconds: ''
  })

  let {
    userId,
    eventId,
    firstName,
    lastName,
    ageCategory,
    institution,
    runTiming,
    // screenshot,
    verified,
    runDistance,
    runDate
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

  const handleTimeChange = (e) => {
    setRunTime((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const toHome = () => {
    navigate('/')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const h = runTime.hours === '' ? '00' : runTime.hours > 23  ? '23' : String(runTime.hours).padStart(2, '0')
    const m = runTime.minutes === '' ? '00' : runTime.minutes > 59 ? '59' : String(runTime.minutes).padStart(2, '0')
    const s = runTime.seconds === '' ? '00' : runTime.seconds > 59 ? '59' : String(runTime.seconds).padStart(2, '0')

    runTiming = h + ':' + m + ':' + s

    const resultData = {
      userId,
      eventId,
      firstName,
      lastName,
      ageCategory,
      institution,
      runTiming,
      // screenshot,
      verified,
      runDistance,
      runDate
    }

    console.log(resultData)
  
    dispatch(createResult(resultData))

    if (isSuccess) {
      toast({
        title: 'Uploaded results successfully',
        status: "success",
        isClosable: true
      })
      navigate('/')
    }
  }

  // const {
	// 	handleSubmit,
	// 	register,
	// 	setError,
	// 	control,
	// 	formState: { field },
	// } = useForm()
  
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Stack spacing={8}>
          <Text
            fontWeight={700}
            fontSize={'2xl'}
            color={'primary.800'}>
            Upload Results
          </Text>

          <Text
            fontWeight={400}
            fontSize={'sm'}
            color={'primary.800'} >
            You may run as often as you like and each time you upload your results within the day,
            the leaderboard will be updated. Your results will be added to the overall leaderboard the following day.
            Note that failure to submit your results before 2359 hrs on the day would render the results invalid. In case of technical
            hitches preventing submission, drop a note to running.route.tracking@gmail.com on the day itself.
          </Text>

          <Stack spacing={4}>
            <Text
              fontWeight={700}
              fontSize={'md'}
              color={'primary.800'} >
              Personal particulars
            </Text>
           
            <Stack spacing={2}>
              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>Name:</Text>
                <Text fontWeight={400}>
                  {data.firstName + ' ' + data.lastName}
                </Text>
              </HStack>

              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>DOB:</Text>
                <Text fontWeight={400}>
                  {data.birthDate.toLocaleString("en-US", {timeZone: "Asia/Singapore"})}
                </Text>
              </HStack>

              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>Gender:</Text>
                <Text fontWeight={400}>
                  {data.gender}
                </Text>
              </HStack>

              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>NRIC:</Text>
                <Text fontWeight={400}>
                  {data.nric}
                </Text>
              </HStack>

              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>E-Mail:</Text>
                <Text fontWeight={400}>
                  {data.email}
                </Text>
              </HStack>
            </Stack>
          </Stack>

          <Stack>
          <FormControl isRequired>
              <Input
                name="runDate"
                value={formData.runDate}
                pr="9px"
                type="date"
                onChange={onChange}
              />
              <FormHelperText>Date of run</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <NumberInput precision={2}>
                <NumberInputField placeholder='Distance (in KM)' name='runDistance' value={runDistance} onChange={onChange} />
              </NumberInput>
            <FormHelperText>Run Distance as reflected in screenshot</FormHelperText>
          </FormControl>
          </Stack>

          <Stack spacing={4}>
            <Text
              fontWeight={700}
              fontSize={'md'}
              color={'primary.800'} >
              Time clocked
            </Text>  
            <SimpleGrid columns={3} spacing={4} >
              <GridItem>
                <FormControl isRequired>
                  <NumberInput min={0} max={23}>
                    <NumberInputField placeholder='HH' name='hours' value={runTime.hours} onChange={handleTimeChange} />
                  </NumberInput>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <NumberInput min={0} max={59}>
                    <NumberInputField placeholder='MM' name='minutes' value={runTime.minutes} onChange={handleTimeChange} />
                  </NumberInput>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <NumberInput min={0} max={59}>
                    <NumberInputField placeholder='SS' name='seconds' value={runTime.seconds} onChange={handleTimeChange} />
                  </NumberInput>
                </FormControl>
              </GridItem>
            </SimpleGrid>

            {/* <Input
              type={'file'}
              name='screenshot'
              onChange={onChange}
              accept='image/*'
              multiple={false}
            /> */}

            {/* <Text
              fontWeight={700}
              fontSize={'md'}
              color={'primary.800'}
            >
              Strava Screenshot
            </Text> */}

            {/* <FileUpload
              name="screenshot"
              acceptedFileTypes="image/*"
              isRequired={true}
              placeholder={"Attach Screenshot"}
              control={control}
              setFormData={setFormData}
              formData={formData}
            >
              Strava Screenshot
            </FileUpload> */}
            
            {/* <Button
              bg='primary.200'
              color='primary.800'
              size='lg'
              fontSize='lg'
              fontWeight='700'
              rightIcon={<FiImage />}
            >
              Attach Screenshot
            </Button> */}

          </Stack>

          <Stack spacing='2'>
            <Button
              type="submit"
              color="primary.white"
              bg="primary.800"
              size="lg"
              fontSize='lg'
              fontWeight='700'
            >
              Upload Now
            </Button>
            <Button
              onClick={toHome}
              bg='primary.200'
              color='primary.800'
              size='lg'
              fontSize='lg'
              fontWeight='700'
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  )
}

export default UploadResults