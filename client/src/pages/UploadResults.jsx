import { React } from "react";
import { useState, useEffect, useRef } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
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
    apiVerified: false,
    loopsVerified: false,
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
    apiVerified,
    loopsVerified,
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

  const convertRunTime = (runTime) => {
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
    return runTiming;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    runTiming = convertRunTime(runTime);

    const resultData = {
      eventId,
      runTiming,
      // screenshot,
      apiVerified,
      loopsVerified,
      runDistance,
      runDate,
      loops,
    };

    console.log(resultData);

    dispatch(createResult(resultData));
  };

  // MODAL SCRIPTS
  const [checked, setIsChecked] = useState(false);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure({
    defaultIsOpen: true,
  });

  const handleOnchange = (e) => {
    setIsChecked(e.target.checked);
    localStorage.setItem("hide", e.target.checked);
  };

  let hide = localStorage.getItem("hide", checked);

  // ALERT DIALOG SCRIPTS
  const {
    isOpen: isAD1Open,
    onOpen: onAD1Open,
    onClose: onAD1Close,
  } = useDisclosure();
  const cancelAD1Ref = useRef();
  const {
    isOpen: isAD2Open,
    onOpen: onAD2Open,
    onClose: onAD2Close,
  } = useDisclosure();
  const cancelAD2Ref = useRef();

  const closeAD1 = () => {
    onAD1Close();
    onAD2Open();
  };

  const closeAD2 = (e) => {
    onAD2Close();
    onSubmit(e);
  };

  return (
    <Container>
      <Modal
        closeOnOverlayClick={false}
        blockScrollOnMount={true}
        onClose={onModalClose}
        isOpen={isModalOpen && hide != "true"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={400} fontSize={"sm"} color={"primary.800"} pt={4}>
              Prior to your first result upload, request to follow “MR25 2022”
              on Strava. Respond and approve the request to follow you upon
              receiving notification on Strava. This is for result verification
              and ratification. For more details,{" "}
              <Link color="teal.500" href="./howToParticipate">
                click here
              </Link>
              .
            </Text>
          </ModalBody>
          <ModalFooter>
            <Checkbox value={checked} onChange={handleOnchange} size={"sm"}>
              I have followed MR25 2022 on Strava and approved the request to
              follow
            </Checkbox>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <form onSubmit={onSubmit}>
        <AlertDialog
          isOpen={isAD1Open}
          leastDestructiveRef={cancelAD1Ref}
          onClose={closeAD1}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Are all data inputs correct?
              </AlertDialogHeader>

              <AlertDialogBody>
                <Stack spacing={2}>
                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>Date of run:</Text>
                    <Text fontWeight={400}>{runDate}</Text>
                  </HStack>

                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>Run Distance:</Text>
                    <Text fontWeight={400}>{runDistance}</Text>
                  </HStack>

                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>Number of 10.5km Loops:</Text>
                    <Text fontWeight={400}>{loops}</Text>
                  </HStack>

                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>Elapsed Time:</Text>
                    <Text fontWeight={400}>{convertRunTime(runTime)}</Text>
                  </HStack>
                </Stack>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelAD1Ref} onClick={onAD1Close}>
                  No
                </Button>
                <Button colorScheme="red" onClick={closeAD1} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <AlertDialog
          isOpen={isAD2Open}
          leastDestructiveRef={cancelAD2Ref}
          onClose={onAD2Close}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Is the input time Elapsed Time?
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelAD2Ref} onClick={onAD2Close}>
                  No - back to edit screen
                </Button>
                <Button
                  colorScheme="red"
                  onClick={closeAD2}
                  ml={3}
                  type={"submit"}
                >
                  Yes - Proceed to Upload
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

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
              color="primary.white"
              bg="primary.800"
              size="lg"
              fontSize="lg"
              fontWeight="700"
              onClick={onAD1Open}
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
