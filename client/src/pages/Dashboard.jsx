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
import routeMap from "../images/routeMap.jpeg";
import seoul_garden from "../images/Seoul-Garden-Group.jpeg"
import pocari from "../images/pocari_logo.jpg"
import KPS from "../images/KPS.jpeg"
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
        <GridItem colSpan={4}>
          <Text textStyle="heading_s">{event.name}</Text>
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
          system that factors the runner{"’"}s age and gender. Please refer to
          the Table of Extrapolated Age Standards below
        </Text>
        <Text
          fontWeight={400}
          fontSize={"sm"}
          fontStyle={"italic"}
          color={"primary.600"}
        >
          ^The Standard 10.5km loop: Anti-clockwise from Mushroom Café (Start)
          {">"} Northern Route {">"} Ranger Station {">"} Mosquito Ring
          (Jelutong Tower) {">"} Golf Course {">"} Lornie Trail {">"}
          Mushroom Café (marked in red in the map below)
        </Text>

        <TableContainer>
          <Table variant="simple" size={"sm"}>
            <TableCaption>Summary of Event Formats</TableCaption>
            <Thead>
              <Tr>
                <Th>Event</Th>
                <Th>Date/Period</Th>
                <Th>Format</Th>
                <Th>Winning Criteria</Th>
                <Th>Prizes</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>A</Td>
                <Td>
                  Qualifying from 1 Dec to 18 Dec <br /> Finals on 31 Dec
                </Td>
                <Td>Virtual qualifying + Physical finals</Td>
                <Td>Best API score based on 10.5km time</Td>
                <Td>
                  (A) Top 10 Male {"&"} Top 10 Female qualifies for finals (date
                  and time TBC) <br /> (B) Top 5 Men and Top 5 Women
                </Td>
              </Tr>
              <Tr>
                <Td>B</Td>
                <Td>1 Dec to 18 Dec</Td>
                <Td>Virtual</Td>
                <Td>Most number of 10.5km loops</Td>
                <Td>Top 3 Male {"&"} Top 3 Female</Td>
              </Tr>
              <Tr>
                <Td>C</Td>
                <Td>
                  Qualifying from 1 Dec to 18 Dec <br /> Finals on 31 Dec
                </Td>
                <Td>Virtual qualifying + Physical finals</Td>
                <Td>
                  Most loops covered within qualifying period; most loops in 12
                  hours in the Finals
                </Td>
                <Td>
                  (A) Top 30 Male {"&"} Top 30 Female qualifies for finals on 31
                  Dec 7am to 7pm <br /> (B) Top 10 Men and Top 10 Women
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
          provided (Only result recorded by Strava app is accepted)
        </Text>

        <Text
          fontWeight={400}
          fontSize={"sm"}
          fontStyle={"italic"}
          color={"primary.600"}
        >
          You may run as often as you like and each time you upload your results
          within the day, the leaderboard will be updated. Your results will be
          added to the overall leaderboard for both formats the following day.
          Note that failure to submit your results before 2359hr on the day
          would render the results invalid. In case of technical hitches
          preventing submission, drop a note to running.route.tracking@gmail.com
          on the day itself.
        </Text>

        <Text fontWeight={700} fontSize={"md"}>
          EVENT A - THE BEST AGE PERFORMANCE INDEX (Blended event - Virtual +
          Physical)
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          Event A ranks participants using the Age Performance Index (API),
          which is based on our MR25 All-Inclusive 10.5km Trail Performance
          Index.
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          MR25 All-inclusive 10.km Trail Performance Index is a performance
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
          scores will qualify for the Finals (tentatively scheduled in the
          afternoon of 31 Dec). Trophies and attractive prizes, including $2500,
          to be given out to the top- 5 winners in each category. Events T-shirt
          will also be given out to all participants between 8am and 6pm on 31
          Dec 2022 at MacRitchie Reservoir.
        </Text>

        <Text fontWeight={700} fontSize={"md"}>
          EVENT B - THE MOST NUMBER OF 10.5KM LOOPS (Virtual event from 1 Dec to
          18 Dec)
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          Event B hopes to encourage our members to return regularly to our
          signature 10.5 km loop, to test our endurance while making our MR25
          presence felt in MacRitchie Reservoir. (Do turn up in one of our
          numerous MR25 official running vests!)
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          $600 vouchers to be given out to the top 3 winners in each category.
          Events T-shirt will also be given out to all participants between 8am
          and 6pm on 31 Dec 2022 at MacRitchie Reservoir.
        </Text>

        <Text fontWeight={700} fontSize={"md"}>
          EVENT C - THE MOST NUMBER OF 10.5KM LOOPS (Blended event – Virtual +
          Physical)
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          This is also the Seoul Garden - MR25 Ultramarathon that is also opened
          to the general public. (Registration fees is $65. Members pay $25.) As
          we have restriction on number of participants by Nparks, we are only
          able to organise the event for limited number of participants on event
          day. As such, we will organise this event in a blended format.
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          Participants are given from 1 Dec to 18 Dec to cover as many 10.5km
          loops as possible at their own time. At the end of the qualifying
          period, on 19 Dec, the top 30 male and 30 female with the highest
          number of loops during the qualifying period will be invited to
          participate in the finals on 31 Dec. Female runners have 6.45am to
          6.45 pm to complete their 12 hour challenge while male runners have
          7.15am to 7.15pm to do so.
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          Events T-shirt will be given out to all participants on 31 Dec 2022 at
          MacRitchie Reservoir. Trophies and $5000 cash prizes will be awarded
          to the top 10 finishers in both the men and women category.
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          Members who are keen to sign up for the event may do so using this
          app. Create an account and then register for the event. Upon
          registration, you will receive a confirmation email by the following
          day. You may then proceed to time your 10.5 km run using Strava app
          according to the event formats below and upload it on the MR25 10.5km
          Challenge result upload page.
        </Text>

        <VStack spacing={4} align={"flex-start"}>
        <Text fontWeight={700} fontSize={"md"}>
          Sponsors
        </Text>
        <Stack direction = 'row'>
          <Image boxSize = '150px' src={seoul_garden} alt={"route-map-image"} />
          <Image boxSize = '150px' src={KPS} alt={"route-map-image"} img_size={100}/>
          <Image boxSize = '150px' src={pocari} alt={"route-map-image"} />
        </Stack>
        
      </VStack>

      </VStack>
    </VStack>



  ));
}

export default Dashboard;
