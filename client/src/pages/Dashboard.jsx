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
  Link,
  UnorderedList,
  ListItem,
  OrderedList
} from "@chakra-ui/react";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, reset } from "../features/event/eventSlice";
import { useEffect } from "react";
import routeMap from "../images/routeMap.jpeg";
import { FiCalendar, FiMapPin, FiCheckCircle, FiXCircle } from "react-icons/fi";
import ReadMoreToggle from "../components/ReadMoreToggle";

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

  const toLogin = () => {
    navigate("/login");
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
          ) : (
            null
          )}
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
              onClick={toLogin}
            >
              Login to Register
            </Button>
          )}
        </GridItem>
      </Grid>

      <ReadMoreToggle
        contentArr={event
          .eventDetails
          .eventDescription
          .split('<br/>')
        }
        title={'About the Event'}
      />

      <Text fontWeight={700} fontSize={"lg"}>
        Event details
      </Text>

      <Grid w={"100%"} templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <Text fontWeight={700} fontSize={"md"}>
            Event (Virtual Race) Period
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

      <VStack spacing={4} align={"flex-start"}>
        <Text fontWeight={700} fontSize={"md"}>
          Route
        </Text>
        <Image src={routeMap} alt={"route-map-image"} />
        <Text fontWeight={400} fontSize={"sm"}>
          {event.eventDetails.eventRoute}
        </Text>
      </VStack>

      <VStack spacing={4} align={"flex-start"}>
        <Text fontWeight={700} fontSize={"md"}>
          Finisher medal
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          {event.eventDetails.finisherPrize}
        </Text>
      </VStack>

      <VStack spacing={4} align={"flex-start"}>
        <Text fontWeight={700} fontSize={"md"}>
          Age-gender categories
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          The event will be split into the following age-gender categories
        </Text>
        <UnorderedList px={4} >
          {event.eventDetails.ageCategories.map((ageCat) => (
            <ListItem key={ageCat} fontWeight={400} fontSize={"sm"}>
              {ageCat}
            </ListItem>
          ))}
        </UnorderedList>
        <Text fontWeight={400} fontSize={"sm"} fontStyle={"italic"}>
          Age is calculated based on age as at 31 Dec 2022
        </Text>
      </VStack>

      <VStack spacing={4} align={"flex-start"}>
        <Text fontWeight={700} fontSize={"md"}>
          Leaderboard - Inidividual
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          {event.eventDetails.indivLB}
        </Text>
      </VStack>

      <VStack spacing={4} align={"flex-start"}>
        <Text fontWeight={700} fontSize={"md"}>
          Leaderboard - Team
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          {event.eventDetails.teamLB}
        </Text>
      </VStack>

      <Grid w={"100%"} templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <Text fontWeight={700} fontSize={"md"}>
            Grand Finale
          </Text>
        </GridItem>
        <GridItem colSpan={[2, 1]}>
          <Tag size={"lg"} variant="subtle" w={"100%"} p={4}>
            <TagLeftIcon boxSize={"24px"} as={FiCalendar} />
            <TagLabel>
              {formatDateDDMonYYYY(event.eventDetails.finalDate)}
            </TagLabel>
          </Tag>
        </GridItem>
        <GridItem colSpan={[2, 1]}>
          <Tag size={"lg"} variant="subtle" w={"100%"} p={4}>
            <TagLeftIcon boxSize={"24px"} as={FiMapPin} />
            <TagLabel>{event.eventDetails.finalLocation}</TagLabel>
          </Tag>
        </GridItem>
        {/* <GridItem colSpan={2}>
          <Text fontWeight={400} fontSize={"sm"}>
            {event.eventDetails.finalDescription}
          </Text>
        </GridItem> */}
      </Grid>
    </VStack>
  ));
}

export default Dashboard;
