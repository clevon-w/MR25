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
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Link,
} from "@chakra-ui/react";
// import { FiImage } from 'react-icons/fi'
import { createResult, resetResult } from "../features/results/resultSlice";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";
import RaceInstructions from "../components/RaceInstructions";
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

  // eventid is hard coded at the moment
  // as we only have one event
  const [formData, setFormData] = useState({
    eventId: "62864db1e76d2b7a270da2df",
    runTiming: "",
    runDate: "",
    runDistance: "",
    loops: "",
    // screenshot: null,
    verified: false,
  });

  const [runTime, setRunTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });

  let {
    eventId,
    runTiming,
    // screenshot,
    verified,
    runDistance,
    runDate,
    loops,
  } = formData;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (data.registeredEvents.length === 0) {
      toast({
        title:
          "No registered event. Please register for the event to upload results",
        status: "error",
        isClosable: true,
      });
      navigate("/registerEvent");
    }

    if (isSuccess) {
      toast({
        title: "Uploaded results successfully!",
        status: "success",
        isClosable: true,
      });
      navigate("/");
      return () => {
        dispatch(resetResult());
      };
    }
  }, [
    dispatch,
    navigate,
    isSuccess,
    isError,
    message,
    toast,
    data.registeredEvents.length,
  ]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTimeChange = (e) => {
    setRunTime((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const toDashboard = () => {
    navigate("/");
  };

  const onSubmit = (e) => {
    e.preventDefault();

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
      eventId,
      runTiming,
      // screenshot,
      verified,
      runDistance,
      runDate,
      loops,
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
            You may run as often as you like and each time you upload your
            results within the day, the leaderboard will be updated. Note that
            failure to submit your results before 2359 hrs on the day would
            render the results invalid. In case of technical hitches preventing
            submission, drop a note to{" "}
            <Link
              color="teal.500"
              href="mailto:running.route.tracking@gmail.com"
            >
              running.route.tracking@gmail.com
            </Link>{" "}
            on the day itself.
          </Text>

          <Text fontWeight={400} fontSize={"sm"} color={"primary.800"}>
            Before your run and uploading of results, do check out the{" "}
            <Link color="teal.500" href="./howToParticipate">
              guide to set up Strava
            </Link>{" "}
            at the bottom of the "How to Participate" page.
          </Text>

          {/* <RaceInstructions /> */}

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
              <FormLabel fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Date of run
              </FormLabel>
              <Input
                name="runDate"
                value={formData.runDate}
                pr="9px"
                type="date"
                onChange={onChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Run Distance (as reflected on Strava)
              </FormLabel>
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

            <FormControl isRequired>
              <FormLabel fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Number of 10.5km Loops
              </FormLabel>
              <NumberInput
                min={0}
                onChange={(value) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    ["loops"]: value,
                  }))
                }
              >
                <NumberInputField
                  placeholder="Number of 10.5km loops"
                  name="loops"
                  value={loops}
                  onChange={onChange}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Stack>

          <FormControl isRequired>
            <FormLabel fontWeight={700} fontSize={"md"} color={"primary.800"}>
              Elapsed Time (as reflected on Strava)
            </FormLabel>
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
          </FormControl>

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
