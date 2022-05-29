import { React } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  FormControl,
  FormLabel,
  Text,
  Container,
  Input,
  Button,
  HStack,
  SimpleGrid,
  GridItem,
  NumberInput,
  NumberInputField,
  useToast,
  VStack,
  UnorderedList,
  OrderedList,
  ListItem,
  Link
} from "@chakra-ui/react";
// import { FiImage } from 'react-icons/fi'
import { createResult, reset } from "../features/results/resultSlice";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";
// import FileUpload from '../components/FileUpload';
// import { useForm } from 'react-hook-form';

function UploadResults() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  /**
   * state.auth retrieves the states of the user
   * state.auth.user retrieves the data stored in the paylaod
   */
  const { data } = useSelector((state) => state.auth.user);
  // const { events } = useSelector((state) => state.events);
  const { isError, isSuccess, message } = useSelector((state) => state.results);

  // category and institution is hard coded at the moment
  // as we only have one event
  const [formData, setFormData] = useState({
    userId: data._id,
    eventId: "62864db1e76d2b7a270da2df",
    firstName: data.firstName,
    lastName: data.lastName,
    ageCategory: '',
    institution: '',
    runTiming: '',
    runDate: '',
    runDistance: '',
    // screenshot: null,
    verified: false
  });

  const [runTime, setRunTime] = useState({
    hours: "",
    minutes: "",
    seconds: ""
  });

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
  } = formData;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (data.registeredEvents.length === 0){
      toast({
        title: 'No registered event. Please register for the event to upload results',
        status: "error",
        isClosable: true
      })
      navigate('/registerEvent')
    }

    if (isSuccess) {
      toast({
        title: "Uploaded results successfully!",
        status: "success",
        isClosable: true
      });
      navigate("/");
      return () => {
        dispatch(reset());
      };
    }
  }, [dispatch, navigate, isSuccess, isError, message, toast]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleTimeChange = (e) => {
    setRunTime((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const toDashboard = () => {
    navigate("/");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    ageCategory = data.registeredEvents[0]['62864db1e76d2b7a270da2df'].category
    institution = data.registeredEvents[0]['62864db1e76d2b7a270da2df'].institution
    
    const h =
      runTime.hours === ""
        ? "00"
        : runTime.hours > 23
        ? "23"
        : String(runTime.hours).padStart(2, "0");
    const m =
      runTime.minutes === ""
        ? "00"
        : runTime.minutes > 59
        ? "59"
        : String(runTime.minutes).padStart(2, "0");
    const s =
      runTime.seconds === ""
        ? "00"
        : runTime.seconds > 59
        ? "59"
        : String(runTime.seconds).padStart(2, "0");

    runTiming = h + ":" + m + ":" + s;

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
    };

    console.log(resultData);

    dispatch(createResult(resultData));
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Stack spacing={8}>
          <Text fontWeight={700} fontSize={"2xl"} color={"primary.800"}>
            Upload Result
          </Text>

          <Text fontWeight={400} fontSize={"sm"} color={"primary.800"}>
            You may run as often as you like and each time you upload your results within the day,
            the leaderboard will be updated. Note that failure to submit your results before 2359 hrs
            on the day would render the results invalid. In case of technical hitches preventing
            submission, drop a note to{' '}
            <Link
                color="teal.500"
                href="mailto:running.route.tracking@gmail.com"
            >
              running.route.tracking@gmail.com 
            </Link>
            {' '}on the day itself.
          </Text>

          <VStack spacing={4} align={'flex-start'}>
            <Text fontWeight={700} fontSize={"md"}>
              Race Instruction (Virtual Segment)
            </Text>
            <Text fontWeight={600} fontSize={"sm"}>
              Before your 1st run - Join this event’s Strava “club” for result verifications
            </Text>
            <Text fontWeight={400} fontSize={"sm"} >
              Visit{" "}
              <Link
                color="teal.500"
                href="https://www.strava.com/clubs/VAMR5km"
              >
                www.strava.com/clubs/VAMR5km
              </Link>{" "}
              and click the “Request to Join” button.
            </Text>
            <VStack spacing={2} align={"flex-start"}>
              <Text fontWeight={400} fontSize={"sm"} >
                Important notes:
              </Text>
              <UnorderedList px={4} >
                <ListItem fontWeight={400} fontSize={"sm"} >
                  Please set the name in your Strave app to the name you registered with for this race.
                </ListItem>
                <ListItem fontWeight={400} fontSize={"sm"} >
                  Please note that by joining this event’s “club” VA MacRitchie Trail 5km Blended Challenge 2022 on Strava,
                  all your run records will be visible to the organiser for the purpose of result verifications.
                  This Strava “club” will be deleted once the event is over.
                </ListItem>
              </UnorderedList>
            </VStack>
            <Text fontWeight={600} fontSize={"sm"}>
              Before every run - Set the Type of Activity in Strava app
            </Text>
            <Text fontWeight={400} fontSize={"sm"}>
              Select “Race” in the Type of Activity in your Strava app before recording every run as only Elapsed Time is accepted.
              The Strava app’s default Moving Time will not be accepted.
            </Text>

            <Text fontWeight={600} fontSize={"sm"}>
              After every run - Save a screenshot and upload result
            </Text>
            <OrderedList px={4} >
              <ListItem fontWeight={400} fontSize={"sm"} >
                Save a screenshot of the run on Strava app as a proof of your completed run (no submission required at the moment).
                The screenshot should consist a map displaying the route taken and the 2 information above, your Name and the Elapsed Time.
              </ListItem>
              <ListItem fontWeight={400} fontSize={"sm"} >
                Click on “Upload Result +” to upload your run result based on the data captured by your Strava app.
              </ListItem>
            </OrderedList>
            <VStack spacing={2} align={"flex-start"}>
              <Text fontWeight={400} fontSize={"sm"} >
                Important note:
              </Text>
              <UnorderedList px={4} >
                <ListItem fontWeight={400} fontSize={"sm"} >
                  Result must be submitted before 2359hr on the day of run. Failure to do so would render the result invalid.
                </ListItem>
              </UnorderedList>
            </VStack>
          </VStack>

          <Stack spacing={4}>
            <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
              Personal particulars
            </Text>

            <Stack spacing={2}>
              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>Name:</Text>
                <Text fontWeight={400}>
                  {data.firstName + " " + data.lastName}
                </Text>
              </HStack>

              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>DOB:</Text>
                <Text fontWeight={400}>
                  {formatDateDDMonYYYY(data.birthDate)}
                </Text>
              </HStack>

              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>Gender:</Text>
                <Text fontWeight={400}>{data.gender}</Text>
              </HStack>

              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>NRIC:</Text>
                <Text fontWeight={400}>{data.nric}</Text>
              </HStack>

              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>E-Mail:</Text>
                <Text fontWeight={400}>{data.email}</Text>
              </HStack>
            </Stack>
          </Stack>

          <Stack>
            <FormControl isRequired>
              <FormLabel fontWeight={700} fontSize={"md"} color={"primary.800"} >Date of run</FormLabel>
              <Input
                name="runDate"
                value={formData.runDate}
                pr="9px"
                type="date"
                onChange={onChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight={700} fontSize={"md"} color={"primary.800"} >Run Distance (as reflected on Strava)</FormLabel>
              <NumberInput precision={2}>
                <NumberInputField
                  placeholder="Distance (in KM)"
                  name="runDistance"
                  value={runDistance}
                  onChange={onChange}
                />
              </NumberInput>
              {/* <FormHelperText>
                Run Distance as reflected in screenshot
              </FormHelperText> */}
            </FormControl>
          </Stack>

          <Stack spacing={4}>
            <Text fontWeight={700} fontSize={"md"} color={"primary.800"} >
              Elapsed Time (as reflected on Strava)
            </Text>
            <SimpleGrid columns={3} spacing={4}>
              <GridItem>
                <FormControl isRequired>
                  <NumberInput min={0} max={23}>
                    <NumberInputField
                      placeholder="HH"
                      name="hours"
                      value={runTime.hours}
                      onChange={handleTimeChange}
                    />
                  </NumberInput>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <NumberInput min={0} max={59}>
                    <NumberInputField
                      placeholder="MM"
                      name="minutes"
                      value={runTime.minutes}
                      onChange={handleTimeChange}
                    />
                  </NumberInput>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <NumberInput min={0} max={59}>
                    <NumberInputField
                      placeholder="SS"
                      name="seconds"
                      value={runTime.seconds}
                      onChange={handleTimeChange}
                    />
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

          <Stack spacing="2">
            <Button
              type="submit"
              color="primary.white"
              bg="primary.800"
              size="lg"
              fontSize="lg"
              fontWeight="700"
            >
              Upload Now
            </Button>
            <Button
              onClick={toDashboard}
              bg="primary.200"
              color="primary.800"
              size="lg"
              fontSize="lg"
              fontWeight="700"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}

export default UploadResults;

