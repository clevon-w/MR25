import React from "react";
import {
  Tag,
  Text,
  TagLabel,
  TagLeftIcon,
  Button,
  Grid,
  GridItem,
  VStack,
  Alert,
  AlertIcon,
  HStack,
  Divider,
  Select,
  FormControl,
  FormLabel,
  Input,
  Link
} from "@chakra-ui/react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, reset } from "../features/event/eventSlice";
import { useEffect, useState } from "react";
import FormRadio from "../components/FormRadio";
import FormCheckbox from "../components/FormCheckbox";
import { update } from "../features/auth/authSlice";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";

function RegisterEvent() {
  const dispatch = useDispatch();

  const { events, isError, message } = useSelector((state) => state.events);

  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    category: "",
    institution: "",
    heartCondition: "",
    chestPainWithPhysical: "",
    chestPainWoPhysical: "",
    loseBalance: "",
    boneProblem: "",
    prescribedDrugs: "",
    otherReason: "",
    covid19: false,
    termsAndCond: false,
    above18: "",
    parentName: "",
    parentNRIC: "",
    parentMobile: "",
    dataConsent: false,
    pending: "pending",
    registeredDate: ""
  });

  let {
    category,
    institution,
    heartCondition,
    chestPainWithPhysical,
    chestPainWoPhysical,
    loseBalance,
    boneProblem,
    prescribedDrugs,
    otherReason,
    covid19,
    termsAndCond,
    above18,
    parentName,
    parentNRIC,
    parentMobile,
    dataConsent,
    pending,
    registeredDate
  } = formData;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getEvents());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  const checkRegistered = (event) => {
    let eventIdArr = [];
    eventIdArr = user.data.registeredEvents.flatMap((obj) =>
      eventIdArr.concat(Object.keys(obj))
    );
    return eventIdArr.includes(event._id);
  };

  const registrationDetails = (eventId, param) => {
    for (let i = 0; i < user.data.registeredEvents.length; i++) {
      let eventObj = user.data.registeredEvents[i];
      if (Object.keys(eventObj)[0] === eventId) {
        return eventObj[eventId][param] === ""
          ? "N/A"
          : eventObj[eventId][param];
      }
    }
  };

  const yesNoRadio = {
    yes: "Yes",
    no: "No"
  };

  const above18Radio = {
    yes: "I am 18 years old or above",
    no: "I am under 18 years old. I have sought the consent from my parent/legal guardian to participate in this activity and provided his/her particulars below"
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registeredDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Singapore"
    })
    const userData = [
      ...user.data.registeredEvents,
      {
        [events[0]._id]: {
          category,
          institution,
          heartCondition,
          chestPainWithPhysical,
          chestPainWoPhysical,
          loseBalance,
          boneProblem,
          prescribedDrugs,
          otherReason,
          covid19,
          termsAndCond,
          above18,
          parentName,
          parentNRIC,
          parentMobile,
          dataConsent,
          pending,
          registeredDate
        }
      }
    ];

    const args = {
      id: user.data._id,
      data: {
        registeredEvents: userData
      }
    };

    dispatch(update(args));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return events.map((event) => (
    <form onSubmit={onSubmit} key={event}>
      <VStack spacing={8} align={"flex-start"}>
        <Grid w={"100%"} templateColumns="repeat(6, 1fr)" gap={4}>
          <GridItem colSpan={4}>
            <Text fontSize={"xl"} fontWeight={700}>
              {"Register: " + event.name}
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            {user ? (
              <Tag
                size={"sm"}
                variant="subtle"
                borderRadius={"full"}
                px={3}
                py={2}
              >
                <TagLeftIcon
                  boxSize={"12px"}
                  as={checkRegistered(event) ? FiCheckCircle : FiXCircle}
                  color={
                    checkRegistered(event) ? "accents.green" : "accents.red"
                  }
                />
                <TagLabel>
                  {checkRegistered(event) ? "Registered" : "Not Registered"}
                </TagLabel>
              </Tag>
            ) : (
              null
            )}
          </GridItem>
        </Grid>

        {user ? (
          <>
            <VStack spacing={4} align={"flex-start"}>
              <Alert
                status="info"
                borderRadius={"lg"}
                borderColor={"accents.blue"}
                borderWidth={"thin"}
              >
                <AlertIcon color={"accents.blue"} />
                Upon registration and receipt of the registration fee, you will
                receive a confirmation email with the race instructions by the
                following day. You may then proceed to time your 5km run using
                the Strava app and upload it to result upload page.
              </Alert>
            </VStack>

            {checkRegistered(event) ? (
              <VStack spacing={4} align={"flex-start"}>
                <Text fontWeight={700} fontSize={"md"}>
                  Registration details
                </Text>

                <HStack spacing={4} fontSize={"sm"}>
                  <Text fontWeight={700}>Status:</Text>
                  <Text fontWeight={400}>
                    {"Registration " +
                      registrationDetails(event._id, "pending")}
                  </Text>
                </HStack>

                <HStack spacing={4} fontSize={"sm"}>
                  <Text fontWeight={700}>Registered on:</Text>
                  <Text fontWeight={400}>
                    {registrationDetails(event._id, "registeredDate")}
                  </Text>
                </HStack>

                <HStack spacing={4} fontSize={"sm"}>
                  <Text fontWeight={700}>Category:</Text>
                  <Text fontWeight={400}>
                    {registrationDetails(event._id, "category")}
                  </Text>
                </HStack>

                <HStack spacing={4} fontSize={"sm"}>
                  <Text fontWeight={700}>Institution:</Text>
                  <Text fontWeight={400}>
                    {registrationDetails(event._id, "institution")}
                  </Text>
                </HStack>

                <HStack spacing={4} fontSize={"sm"}>
                  <Text fontWeight={700}>Name of parent / guardian:</Text>
                  <Text fontWeight={400}>
                    {registrationDetails(event._id, "parentName")}
                  </Text>
                </HStack>

                <HStack spacing={4} fontSize={"sm"}>
                  <Text fontWeight={700}>NRIC of parent / guardian:</Text>
                  <Text fontWeight={400}>
                    {registrationDetails(event._id, "parentNRIC")}
                  </Text>
                </HStack>

                <HStack spacing={4} fontSize={"sm"}>
                  <Text fontWeight={700}>Mobile no. of parent / guardian:</Text>
                  <Text fontWeight={400}>
                    {registrationDetails(event._id, "parentMobile")}
                  </Text>
                </HStack>
              </VStack>
            ) : (
              <>
                <VStack spacing={4} align={"flex-start"}>
                  <Text fontSize={"lg"} fontWeight={700}>
                    Personal Particulars
                  </Text>
                  <Text fontSize={"sm"} fontWeight={400}>
                    You can edit your personal particulars in the My Account
                    page
                  </Text>
                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>Name:</Text>
                    <Text fontWeight={400}>
                      {user.data.firstName + " " + user.data.lastName}
                    </Text>
                  </HStack>
                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>DOB:</Text>
                    <Text fontWeight={400}>
                      {formatDateDDMonYYYY(user.data.birthDate)}
                    </Text>
                  </HStack>
                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>Gender:</Text>
                    <Text fontWeight={400}>{user.data.gender}</Text>
                  </HStack>
                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>NRIC:</Text>
                    <Text fontWeight={400}>{user.data.nric}</Text>
                  </HStack>
                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>Email:</Text>
                    <Text fontWeight={400}>{user.data.email}</Text>
                  </HStack>
                </VStack>

                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    name="category"
                    onChange={onChange}
                    placeholder="Select category"
                  >
                    {event.eventDetails.ageCategories.map((ageCat) => (
                      <option value={ageCat} key={ageCat}>
                        {ageCat}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Institution</FormLabel>
                  <Input
                    name="institution"
                    value={institution}
                    placeholder="Institution"
                    onChange={onChange}
                  />
                </FormControl>

                <Divider
                  borderColor={"primary.800"}
                  opacity={1}
                  borderBottomWidth={1.5}
                />

                <VStack spacing={4} align={"flex-start"}>
                  <Text fontSize={"lg"} fontWeight={700}>
                    PAR-Q Assessment
                  </Text>
                  <Text fontWeight={400} fontSize={"sm"}>
                    Regular physical activity is fun and healthy, and
                    increasingly more people are starting to become more active
                    every day. Being more active is very safe for most people.
                    However, some people should check with their doctor before
                    they start becoming much more physically active.
                  </Text>
                  <Text fontWeight={400} fontSize={"sm"}>
                    If you are planning to become much more physically active
                    than you are now, start by answering the seven questions in
                    the box below. If you are between the ages of 15 and 69, the
                    PAR-Q will tell you if you should check with your doctor
                    before you start. If you are over 69 years of age, and you
                    are not used to being very active, check with your doctor.
                  </Text>

                  <FormRadio
                    question="Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?"
                    name="heartCondition"
                    data={heartCondition}
                    radioOption={yesNoRadio}
                    direction="row"
                    setFormData={setFormData}
                  />

                  <FormRadio
                    question="Do you feel pain in your chest when you do physical activity?"
                    name="chestPainWithPhysical"
                    data={chestPainWithPhysical}
                    radioOption={yesNoRadio}
                    direction="row"
                    setFormData={setFormData}
                  />

                  <FormRadio
                    question="In the past month, have you had chest pain when you were not doing physical activity?"
                    name="chestPainWoPhysical"
                    data={chestPainWoPhysical}
                    radioOption={yesNoRadio}
                    direction="row"
                    setFormData={setFormData}
                  />

                  <FormRadio
                    question="Do you lose your balance because of dizziness or do you ever lose consciousness?"
                    name="loseBalance"
                    data={loseBalance}
                    radioOption={yesNoRadio}
                    direction="row"
                    setFormData={setFormData}
                  />

                  <FormRadio
                    question="Do you have a bone or joint problem (for example, back, knee or hip) that could be made worse by a change in your physical activity?"
                    name="boneProblem"
                    data={boneProblem}
                    radioOption={yesNoRadio}
                    direction="row"
                    setFormData={setFormData}
                  />

                  <FormRadio
                    question="Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?"
                    name="prescribedDrugs"
                    data={prescribedDrugs}
                    radioOption={yesNoRadio}
                    direction="row"
                    setFormData={setFormData}
                  />

                  <FormRadio
                    question="Do you know of any other reason why you should not do physical activity?"
                    name="otherReason"
                    data={otherReason}
                    radioOption={yesNoRadio}
                    direction="row"
                    setFormData={setFormData}
                  />
                </VStack>

                <Divider
                  borderColor={"primary.800"}
                  opacity={1}
                  borderBottomWidth={1.5}
                />

                <VStack spacing={4} align={"flex-start"}>
                  <Text fontSize={"lg"} fontWeight={700}>
                    COVID-19 Safety Acknowledgement
                  </Text>
                  <Text fontSize={"sm"} fontWeight={400}>
                    I agree to self-monitor for signs and symptoms of COVID-19
                    (symptoms typically include fever, cough, and shortness of
                    breath). I will not run in MacRitchie Reservoir Park if I or
                    my close contacts have quarantine order, stay-home notice or
                    discover the mentioned symptoms of COVID-19 in the past 14
                    days. I have read and accept to{" "}
                    <Link
                      color="teal.500"
                      href="https://www.moh.gov.sg/covid-19/resources"
                    >
                      Ministry of Health (MOH)'s guidelines
                    </Link>{" "}
                    in the fight against COVID-19.
                  </Text>
                  <FormCheckbox
                    name="covid19"
                    data={covid19}
                    setFormData={setFormData}
                    text={"I agree to do my part in the fight against COVID-19"}
                  />
                </VStack>

                <Divider
                  borderColor={"primary.800"}
                  opacity={1}
                  borderBottomWidth={1.5}
                />

                <VStack spacing={4} align={"flex-start"}>
                  <Text fontSize={"lg"} fontWeight={700}>
                    Indemnity Agreement
                  </Text>
                  <Text fontSize={"md"} fontWeight={700}>
                    Conditions of entry
                  </Text>
                  <Text fontSize={"sm"} fontWeight={400}>
                    I assume and accept full responsibility for the risks of my
                    participation in the event, and for any injury, damage,
                    death, or other loss that I may suffer, resulting from those
                    risks, include but not limited to the risk of a third
                    party's passive or active negligence or other misconduct.
                  </Text>
                  <FormCheckbox
                    name="termsAndCond"
                    data={termsAndCond}
                    setFormData={setFormData}
                    text="I acknowledge that I have read and agree with the terms and conditions of entry"
                  />

                  <Text fontSize={"md"} fontWeight={700}>
                    Parent's or guardian's consent
                  </Text>
                  <FormRadio
                    question=""
                    name="above18"
                    data={above18}
                    radioOption={above18Radio}
                    direction="column"
                    setFormData={setFormData}
                  />
                  <FormControl>
                    <FormLabel>Name of parent or guardian</FormLabel>
                    <Input
                      name="parentName"
                      value={parentName}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      NRIC / FIN of parent or guardian (last 3 digits and ending
                      alphabet)
                    </FormLabel>
                    <Input
                      name="parentNRIC"
                      value={parentNRIC}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Mobile number of parent or guardian</FormLabel>
                    <Input
                      name="parentMobile"
                      value={parentMobile}
                      onChange={onChange}
                    />
                  </FormControl>
                </VStack>

                <Divider
                  borderColor={"primary.800"}
                  opacity={1}
                  borderBottomWidth={1.5}
                />

                <FormCheckbox
                  name="dataConsent"
                  data={dataConsent}
                  setFormData={setFormData}
                  text="I acknowledge and consent to the collection, use and disclosure of my personal data by Vision Athletics for the purposes set out for this event."
                />

                <Button
                  type="submit"
                  size={"lg"}
                  w="100%"
                  bg={"primary.800"}
                  color={"primary.white"}
                >
                  Submit Registration
                </Button>
              </>
            )}
          </>
        ) : (
          <VStack spacing={4} align={"flex-start"} w={"100%"}>
            <Alert
              status="info"
              borderRadius={"lg"}
              borderColor={"accents.blue"}
              borderWidth={"thin"}
            >
              <AlertIcon color={"accents.blue"} />
              Login to register for the event.
            </Alert>
          </VStack>
        )}
      </VStack>
    </form>
  ));
}

export default RegisterEvent;
