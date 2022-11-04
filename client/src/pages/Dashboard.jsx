/**
 * The dashboard, aka the main page, aka the home page,
 * is also the page where the user will learn about the events
 * since there is only one event, it will be the About MR25 page
 */
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
  Image,
  UnorderedList,
  ListItem,
  TableContainer,
  Table,
  TableCaption,
  Th,
  Thead,
  Tr,
  Td,
  Tbody,
  Stack,
} from "@chakra-ui/react";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, resetEvent } from "../features/event/eventSlice";
import { useEffect } from "react";
import routeMap from "../images/routeMap10_5km.jpeg";
import seoul_garden from "../images/Seoul-Garden-Group.jpeg";
import pocari from "../images/pocari_logo.jpg";
import KPS from "../images/KPS.jpeg";
import { FiCalendar, FiMapPin, FiCheckCircle, FiXCircle } from "react-icons/fi";
import ReadMoreToggle from "../components/ReadMoreToggle";
import RaceInstructions from "../components/RaceInstructions";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { events, isError, message } = useSelector((state) => state.events);

  const { user } = useSelector((state) => state.auth);

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

  const toCreateAccount = () => {
    navigate("/register");
  };

  const toRegisterEvent = () => {
    navigate("/registerEvent");
  };

  return events.map((event) => (
    <VStack spacing={8} align={"flex-start"} key={event}>
      <Grid w={"100%"} templateColumns="repeat(6, 1fr)" gap={4}>
        <GridItem colSpan={[6, 4]}>
          <Text textStyle="heading_s">{event.name}</Text>
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
                as={checkRegistered(event) ? FiCheckCircle : FiXCircle}
                color={checkRegistered(event) ? "accents.green" : "accents.red"}
              />
              <TagLabel>
                {checkRegistered(event) ? "Registered" : "Not Registered"}
              </TagLabel>
            </Tag>
          ) : null}
        </GridItem>
        <GridItem colSpan={6}>
          {user ? (
            <Button
              w={"100%"}
              color={"primary.white"}
              bg={"primary.800"}
              onClick={toRegisterEvent}
            >
              {checkRegistered(event) ? "View registration" : "Register now"}
            </Button>
          ) : (
            <Button
              w={"100%"}
              color={"primary.white"}
              bg={"primary.800"}
              onClick={toCreateAccount}
            >
              Create an Account to Register
            </Button>
          )}
        </GridItem>
      </Grid>

      {/* <ReadMoreToggle
        contentArr={event
          .eventDetails
          .eventDescription
          .split('<br/>')
        }
        title={'About the Event'}
      /> */}
      <VStack spacing={4} align={"flex-start"}>
        <Text fontWeight={700} fontSize={"lg"}>
          About the Event
        </Text>
        {event.eventDetails.eventDescription.split("<br/>").map((para) => (
          <Text fontWeight={400} fontSize={"sm"}>
            {para}
          </Text>
        ))}
        <Text fontWeight={700} fontSize={"sm"}>
          Special feature
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          Each MR25 member is entitled to one guest invitation to the above
          events! Registration for the invited guest is free too. The
          non-members will compete in the exact same format, but only among
          themselves. A separate set of prizes to be awarded to the winners in
          the guest category. Participants will also receive a Finisher T-shirt.
          Details of prizes will be updated in due course. (As the non-members
          are not in our chatgroup / FB page, members will have to manage and
          assist in communication and coordination with their invited guests.)
        </Text>
        <Text fontWeight={700} fontSize={"sm"}>
          Important Note
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          Although there are prizes involved to make the event a little more
          interesting, this is ultimately a fun event organized by the
          management committee for the members. The management trusts all
          members to display integrity and sportsmanship in this friendly event.
          However, should there be a protest over the results, runners would
          need to provide further evidence. (Common problems in previous events
          were participants not following the direction stipulated in the rules
          and participants submitting moving time instead of elapsed time.) The
          organizing committee shall reserve the rights to judge and decide on
          any aspects of the rules that has not been explicitly expressed in
          this competition.
        </Text>
      </VStack>

      <Text fontWeight={700} fontSize={"lg"}>
        Event details
      </Text>

      <Grid w={"100%"} templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <Text fontWeight={700} fontSize={"md"}>
            Event Period
          </Text>
        </GridItem>
        <GridItem colSpan={[2, 1]}>
          <Tag size={"lg"} variant="subtle" w={"100%"} p={4}>
            <TagLeftIcon boxSize={"24px"} as={FiCalendar} />
            <TagLabel>
              {formatDateDDMonYYYY(event.eventDetails.eventStart) +
                " - " +
                formatDateDDMonYYYY(event.eventDetails.eventEnd)}
            </TagLabel>
          </Tag>
        </GridItem>
        <GridItem colSpan={[2, 1]}>
          <Tag size={"lg"} variant="subtle" w={"100%"} p={4}>
            <TagLeftIcon boxSize={"24px"} as={FiMapPin} />
            <TagLabel>{event.eventDetails.eventLocation}</TagLabel>
          </Tag>
        </GridItem>
      </Grid>

      <VStack spacing={4} align={"flex-start"}>
        <Text fontWeight={700} fontSize={"md"}>
          Route
        </Text>
        <Image src={routeMap} alt={"route-map-image"} />
        <Text fontWeight={400} fontSize={"sm"}>
          {event.eventDetails.eventRoute}
        </Text>
      </VStack>

      <VStack spacing={4} align={"flex-start"} maxW={"100%"}>
        <Text fontWeight={700} fontSize={"md"}>
          Event Formats
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          The event will be split into the following formats
        </Text>
        <UnorderedList px={4}>
          {event.eventDetails.eventFormats.map((ageCat) => (
            <ListItem key={ageCat} fontWeight={400} fontSize={"sm"}>
              {ageCat}
            </ListItem>
          ))}
        </UnorderedList>

        <Text
          fontWeight={400}
          fontSize={"sm"}
          fontStyle={"italic"}
          color={"primary.600"}
        >
          *The Age Performance Index is an indication of how close the
          participant is to the extrapolated age standard (100 being equal;{" "}
          {">"}100 - exceeding the age standard) calculated based on the MR25
          All-Inclusive 10.5km Trail Performance Index, a performance grading
          system that factors the runner’s age and gender.
        </Text>
        <Text
          fontWeight={400}
          fontSize={"sm"}
          fontStyle={"italic"}
          color={"primary.600"}
        >
          ^The Standard 10.5km loop: Anti-clockwise from Mushroom Café (Start){" "}
          {">"}
          Northern Route {">"} Ranger Station {">"} Mosquito Ring (Jelutong
          Tower) {">"}
          Golf Course {">"} Lornie Trail {">"} Mushroom Café (marked in red in
          the map above)
        </Text>

        <TableContainer>
          <Table variant="simple" size={"sm"}>
            <TableCaption>Summary of Event Formats</TableCaption>
            <Thead>
              <Tr>
                <Th>Event</Th>
                <Th>Date/Period</Th>
                <Th>Winning Criteria</Th>
                <Th>Prizes</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>A</Td>
                <Td>5 Dec to 26 Dec</Td>
                <Td>Best API score based on 10.5km time</Td>
                <Td>
                  Top 5 Men {"&"} Top 5 Women (Members) <br /> Top 5 Men {"&"}{" "}
                  Top 5 Women (Guests)
                </Td>
              </Tr>
              <Tr>
                <Td>B</Td>
                <Td>5 Dec to 26 Dec</Td>
                <Td>Most number of 10.5km loops</Td>
                <Td>
                  Top 5 Men {"&"} Top 5 Women (Members) <br /> Top 5 Men {"&"}{" "}
                  Top 5 Women (Guests)
                </Td>
              </Tr>
              <Tr>
                <Td>C</Td>
                <Td>31 Dec, 7am to 7pm</Td>
                <Td>Most loops in 12 hours</Td>
                <Td>
                  Top 10 Men {"&"} Top 10 Women (Members) <br /> Top 10 Men{" "}
                  {"&"} Top 10 Women (Guests)
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Text
          fontWeight={400}
          fontSize={"sm"}
          fontStyle={"italic"}
          color={"primary.600"}
        >
          You may start the 10.5km loop^ anywhere outside the mushroom cafe
          (refer to the map for the exact paths to take in the route). Time your
          run taken for the route. End at the same start point and you would
          have recorded your time for the loop. Upload the results to the site
          provided (Only results recorded by Strava app is accepted)
        </Text>

        <Text
          fontWeight={400}
          fontSize={"sm"}
          fontStyle={"italic"}
          color={"primary.600"}
        >
          You may run as often as you like and each time you upload your results
          within the day, the leaderboard will be updated. Your results will be
          added to the overall leaderboard for both Events the following day.
          Note that failure to submit your results before 2359hr on the day
          would render the results invalid. In case of technical hitches
          preventing submission, drop a note to running.route.tracking@gmail.com
          on the day itself.
        </Text>

        <Text fontWeight={700} fontSize={"md"}>
          EVENT A - THE BEST AGE PERFORMANCE INDEX
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          Event A ranks participants using the Age Performance Index (API),
          which is based on our MR25 All-Inclusive 10.5km Trail Performance
          Index.
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          MR25 All-inclusive 10.5km Trail Performance Index is a performance
          grading system that takes into account the runner’s age and gender to
          calculate a corresponding Age Performance Index (API). The API is an
          indication of how close the participant is to the extrapolated age
          standard (100 being equal; {">"}100 - exceeding the age standard). The
          Trail Performance Index used in Event A aims to level the playing
          field by factoring age-related physiological changes to produce a
          performance marker (API) that is more equitable than clocked time. It
          is hoped that this comparative gauge will be a source of motivation,
          especially for our younger and older athletes, adding more fun to the
          challenge.
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          10 male participants and 10 female participants with the best API
          scores will win for themselves medals and attractive prizes. Finisher
          T-shirts will also be given out to all participants. Please collect at
          MacRitchie on 31 Dec, 5pm to 7pm.
        </Text>

        <Text fontWeight={700} fontSize={"md"}>
          EVENT B - THE MOST NUMBER OF 10.5KM LOOPS IN 3 WEEKS
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          Event B hopes to encourage our members to return regularly to our
          signature 10.5 km loop between 5 Dec and 26 Dec, to test our endurance
          while making our MR25 presence felt in MacRitchie Reservoir. (Do turn
          up in one of our numerous MR25 official running vests!)
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          5 male participants and 5 female participants with the most loops will
          win for themselves medals and attractive prizes. Finisher T-shirts
          will also be given out to all participants. Please collect at
          MacRitchie on 31 Dec, 5pm to 7pm.
        </Text>

        <Text fontWeight={700} fontSize={"md"}>
          EVENT C - THE MOST NUMBER OF 10.5KM LOOPS IN 12 HOURS
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          This follows the exact format of our traditional MR25 7am to 7pm
          Ultramarathon. Participants are to cover as many 10.5km loops in an
          anti-clockwise direction within the 12 hours. Unfortunately, due to
          restrictions by NParks, it will not be organised as a physical event.
          As such the club will not be able to provide physical support.
          Participants may, however, collect Pocari drinks from the organisers
          outside the Mushroom Cafe between 6.30am to 7.00am on race day, if
          they choose to.
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          Participants may collect your Finishers T-shirts at the Mushroom café
          from the organisers from 5pm to 7pm. Medals and cash prizes will be
          awarded to the top 5 finishers in both the men and women members
          category.
        </Text>
        <Text fontWeight={700} fontSize={"md"}>
          REGISTRATION
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          Members who are keen to sign up for the event may do so using this
          app. Create an account and then register for the event. Do take note
          that this is a 2 step process. You may then proceed to time your 10.5
          km run using Strava app according to the event formats above and
          upload it on the Seoul Garden - MR25 Endurance Challenge 2022 "Upload
          Result +" page.
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          For members inviting a guest, please include the name of your guest
          and assist him / her in the registration. He / She will need to
          include your full name in his / her registration.
        </Text>

        <VStack spacing={4} align={"flex-start"}>
          <Text fontWeight={700} fontSize={"md"}>
            Sponsors
          </Text>
          <Stack direction={["column", "row"]}>
            <Image boxSize="150px" src={seoul_garden} alt={"route-map-image"} />
            <Image
              boxSize="150px"
              src={KPS}
              alt={"route-map-image"}
              img_size={100}
            />
            <Image boxSize="150px" src={pocari} alt={"route-map-image"} />
          </Stack>
        </VStack>
      </VStack>
    </VStack>
  ));
}

export default Dashboard;
