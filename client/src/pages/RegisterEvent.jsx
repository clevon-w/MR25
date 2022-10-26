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
  Link,
  FormHelperText,
  Center,
  Image,
  UnorderedList,
  ListItem,
  Icon,
  Collapse,
  Switch,
  Stack,
} from "@chakra-ui/react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, resetEvent } from "../features/event/eventSlice";
import { useEffect, useState } from "react";
import FormRadio from "../components/FormRadio";
import FormCheckbox from "../components/FormCheckbox";
import { update } from "../features/auth/authSlice";
import {
  formatDateDDMonYYYY,
  filterCatOptions,
} from "../utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import MR25_paynowQR from "../images/MR25_paynowQR.jpeg";
import joinStravaClub from "../images/join-strava-club.jpeg";
import tShirtSizeImg from "../images/tshirtsize.jpeg";
// import { institutionsArr } from "../utils/institutions";

function RegisterEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { events, isError, message } = useSelector((state) => state.events);

  const { user } = useSelector((state) => state.auth);

  // const [show, setShow] = useState(false);
  // const [readOnce, setReadOnce] = useState(false);
  const [wantToBuy, setWantToBuy] = useState(false);

  const [formData, setFormData] = useState({
    condOfEntry: false,
    parq: false,
    covid19: false,
    // termsAndCond: false,
    above18: "",
    parentName: "",
    parentNRIC: "",
    parentMobile: "",
    shoeSize: "",
    inviteName: "",
    dataConsent: false,
    pending: "pending",
    registeredDate: "",
  });

  let {
    condOfEntry,
    parq,
    covid19,
    // termsAndCond,
    above18,
    parentName,
    parentNRIC,
    parentMobile,
    shoeSize,
    inviteName,
    dataConsent,
    pending,
    registeredDate,
  } = formData;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getEvents());

    return () => {
      dispatch(resetEvent());
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
    no: "No",
  };

  const above18Radio = {
    yes: "I am 18 years old or above",
    no: "I am under 18 years old. I have sought the consent from my parent/legal guardian to participate in this activity and provided his/her particulars below",
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registeredDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Singapore",
    });
    const userData = [
      ...user.data.registeredEvents,
      {
        [events[0]._id]: {
          condOfEntry,
          parq,
          covid19,
          // termsAndCond,
          above18,
          parentName,
          parentNRIC,
          parentMobile,
          shoeSize,
          inviteName,
          dataConsent,
          pending,
          registeredDate,
        },
      },
    ];

    const args = {
      id: user.data._id,
      data: {
        registeredEvents: userData,
      },
    };

    dispatch(update(args));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const toLogin = () => {
    navigate("/login");
  };

  return events.map((event) => (
    <form onSubmit={onSubmit} key={event}>
      <VStack spacing={8} align={"flex-start"}>
        <Grid w={"100%"} templateColumns="repeat(6, 1fr)" gap={4}>
          <GridItem colSpan={[6, 4]}>
            <Text textStyle="heading_s">{"Register: " + event.name}</Text>
          </GridItem>
          <GridItem colSpan={[6, 2]}>
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
            ) : null}
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
                Upon registration, you may proceed to time your 10.5km run using
                the Strava app and upload the result to "Upload Result +" on
                this website.
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
                    {registrationDetails(event._id, "pending") === "pending"
                      ? " (You may start uploading results immediately!)"
                      : ""}
                  </Text>
                </HStack>

                <HStack spacing={4} fontSize={"sm"}>
                  <Text fontWeight={700}>Registered on:</Text>
                  <Text fontWeight={400}>
                    {registrationDetails(event._id, "registeredDate")}
                  </Text>
                </HStack>

                {/* <HStack spacing={4} fontSize={"sm"}>
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
                </HStack> */}

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

                {/* <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    name="category"
                    onChange={onChange}
                    placeholder="Select category"
                  >
                    {filterCatOptions(
                      event.eventDetails.eventFormats,
                      user.data.birthDate,
                      user.data.gender
                    ).map((ageCat) => (
                      <option value={ageCat} key={ageCat}>
                        {ageCat}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText>
                    We have filtered the age categories according to your age
                    and gender that you have entered when you created an
                    account. If your birth date or gender is incorrect, please
                    update your particulars in the "My Account" page.
                  </FormHelperText>
                </FormControl> */}

                {/* <FormControl isRequired>
                  <FormLabel>Institution</FormLabel>
                  <Select
                    name="institution"
                    onChange={onChange}
                    placeholder="Select institution"
                  >
                    {institutionsArr.map((inst) => (
                      <option value={inst} key={inst}>
                        {inst}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText>
                    Please select the full name of your secondary school/junior
                    college /centralised institution/tertiary institution for
                    the team competition. Select "Nil" if inapplicable.
                  </FormHelperText>
                </FormControl> */}

                <Divider
                  borderColor={"primary.800"}
                  opacity={1}
                  borderBottomWidth={1.5}
                />

                <VStack spacing={4} align={"flex-start"}>
                  <Text fontSize={"lg"} fontWeight={700}>
                    Conditions of entry
                  </Text>
                  <Text fontWeight={400} fontSize={"sm"}>
                    I assume and accept full responsibility for the risks of my
                    participation in the event, and for any injury, damage,
                    death, or other loss that I may suffer, resulting from those
                    risks, include but not limited to the risk of a third
                    party's passive or active negligence or other misconduct.
                  </Text>
                  <FormCheckbox
                    name="condOfEntry"
                    data={condOfEntry}
                    setFormData={setFormData}
                    isDisabled={false}
                    text="I acknowledge that I have read and agree with the terms and conditions of entry"
                  />
                </VStack>

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
                    While the club organizes the event for members and the
                    general public, it is the duty and responsibility of the
                    participants to ensure their health and fitness status to
                    take part in an activity as rigorous as a/multiple 10.5 km
                    loop(s) run in the trail. If you are unwell or unsure, you
                    are advised to seek medical advice. Start by answering seven
                    questions stated in SportSG's PAR-Q, ensure that you are
                    sports safe before participate in this activity:
                  </Text>
                  <Link
                    fontWeight={400}
                    fontSize={"sm"}
                    color="teal.500"
                    href="https://mr25.org.sg/wp-content/uploads/2021/07/PARQ-English.pdf"
                  >
                    https://mr25.org.sg/wp-content/uploads/2021/07/PARQ-English.pdf
                  </Link>
                  <FormCheckbox
                    name="parq"
                    data={parq}
                    setFormData={setFormData}
                    isDisabled={false}
                    text="I have read the PAR-Q and it is my responsibility to participate only when I am well"
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
                  {/* <Text fontSize={"md"} fontWeight={700}>
                    Terms and Conditions of entry
                  </Text>
                  <Text fontWeight={400} fontSize={"sm"}>
                    I know that running in an event that is organized as a
                    virtual activity where I run on my own, at a date and time
                    of my choice, which will not have any support or security
                    measures in place by Vision Athletics is a potentially
                    hazardous activity, which could result in injury or death. I
                    acknowledge that I am participating in the activity outlined
                    by this virtual event by my own free will and at my own
                    personal risk.I will not participate in a virtual event
                    unless I am medically abled and properly trained, and by the
                    submission of my registration, I certify that I am medically
                    able to perform this event, and am in good health, and I am
                    properly trained. I further agree to abide by the
                    Multi-Ministry Taskforce’s latest advisories pertaining to
                    COVID-19. I assume all risks to me associated with running
                    on my own as part of this virtual activity, including but
                    not limited to: falls, contact with other park goers, the
                    effects of the weather, including high heat and/or humidity,
                    and the conditions of the trail, all such risks being known
                    or unknown and appreciated by me when out running on my own
                    without any type of support from event organizers. Having
                    read this waiver and knowing these facts and in
                    consideration of your accepting my entry, I, for myself and
                    anyone entitled to act on my behalf, waive and release the
                    organizer, Vision Athletics from all claims or liabilities
                    of any kind arising out of my participation in this virtual
                    event, and waive my ability to bring any legal action
                    against the entities outlined in this waiver as I am
                    voluntarily electing to run on my own as part of this
                    virtual event. I grant permission to all of the personal
                    data provided during registration for any legitimate
                    purpose. I understand that this event does not provide for
                    refunds in the event of a cancellation, and by signing this
                    waiver, I consent that I am not entitled to a refund if the
                    event is cancelled before or during the event.
                  </Text>
                  <FormCheckbox
                    name="termsAndCond"
                    data={termsAndCond}
                    setFormData={setFormData}
                    isDisabled={false}
                    text="I acknowledge that I have read and agree with the terms and conditions of entry"
                  /> */}

                  <FormRadio
                    question="Parent's or guardian's consent"
                    name="above18"
                    data={above18}
                    radioOption={above18Radio}
                    direction="column"
                    setFormData={setFormData}
                  />
                  <FormControl
                    isDisabled={above18 === "yes"}
                    isRequired={above18 === "no"}
                  >
                    <FormLabel>Name of parent or guardian</FormLabel>
                    <Input
                      name="parentName"
                      value={parentName}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormControl
                    isDisabled={above18 === "yes"}
                    isRequired={above18 === "no"}
                  >
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
                  <FormControl
                    isDisabled={above18 === "yes"}
                    isRequired={above18 === "no"}
                  >
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

                <FormControl isRequired>
                  <FormLabel>Shoe Size (US Sizing)</FormLabel>
                  <Select
                    name="shoeSize"
                    onChange={onChange}
                    placeholder="US Shoe Size"
                  >
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>
                    Are you inviting a guest or being invited?
                  </FormLabel>
                  <Input
                    name="inviteName"
                    type="inviteName"
                    value={formData.inviteName}
                    onChange={onChange}
                    placeholder="Guest / Member name"
                  />
                  <FormHelperText fontWeight={400} fontSize={"sm"}>
                    For members inviting a guest, please include the name of
                    your guest in this field and assist him / her in
                    registration. If you are not inviting a guest, leave this
                    field blank.
                  </FormHelperText>
                  <FormHelperText fontWeight={400} fontSize={"sm"}>
                    For guests, please include the name of the registered name
                    of the person inviting you in this field.
                  </FormHelperText>
                </FormControl>

                <FormCheckbox
                  name="dataConsent"
                  data={dataConsent}
                  setFormData={setFormData}
                  text="I acknowledge and consent to the collection, use and disclosure of my personal data by MR25 Running Club for the purposes set out for this 10.5km challenge"
                />

                {/* <Divider
                  borderColor={"primary.800"}
                  opacity={1}
                  borderBottomWidth={1.5}
                />

                <Text textStyle="heading_xs">
                  Before submitting, complete the following
                </Text>
                <VStack spacing={4} align={"flex-start"} w="100%">
                  <Text fontWeight={600} fontSize={"md"}>
                    Registration fee
                  </Text>
                  <Text fontSize={"sm"}>
                    Kindly pay via PayNow (Scan QR code below or enter UEN:
                    52911537M).
                  </Text>
                  <Center w="100%">
                    <Image
                      src={MR25_paynowQR}
                      alt="VAMR Paynow QR code."
                      maxH="360px"
                    />
                  </Center>
                  <UnorderedList>
                    <ListItem fontSize={"sm"}>
                      <b>Amount: </b>$20.00 (non-refundable)
                    </ListItem>
                    <ListItem fontSize={"sm"}>
                      <b>Reference no.: </b>Last 3 digits and ending alphabet of
                      your NRIC or FIN.
                    </ListItem>
                  </UnorderedList>
                  <Text fontSize={"sm"}>
                    Please email a screenshot of your payment to{" "}
                    <b>vision_athletics@yahoo.com</b>
                  </Text>
                </VStack>

                <VStack spacing={4} align={"flex-start"}>
                  <Text fontWeight={600} fontSize={"md"}>
                    Join our Strava club
                  </Text>
                  <Text fontSize={"sm"}>
                    Submit a request to join our Strava club. Your request to
                    join will be approved once you have completed steps 1 and 2.
                  </Text>
                  <UnorderedList>
                    <ListItem fontSize={"sm"}>
                      <b>Club name: </b>
                      <Link
                        color="teal.500"
                        href=" https://www.strava.com/clubs/VAMR5km"
                        isExternal
                        fontSize={"sm"}
                      >
                        VA MacRitchie Trail 5km Blended Challenge 2022
                        <Icon as={FiExternalLink} mx="2px" />
                      </Link>
                    </ListItem>
                  </UnorderedList>
                  <Center w="100%">
                    <Image
                      src={joinStravaClub}
                      alt="Join Strava Club screenshot."
                      maxH="560px"
                    />
                  </Center>
                  <Text fontSize={"sm"} as="i" color="primary.600">
                    Please note that by joining the “club” VA MacRitchie Trail
                    5km Blended Challenge 2022 on Strava, all your run records
                    will be visible to the organiser for the purpose of result
                    verification. This Strava club will be deleted once the
                    event is over.
                  </Text>
                </VStack> */}

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
              onClick={toLogin}
              cursor={"pointer"}
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
