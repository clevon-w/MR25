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
} from "@chakra-ui/react";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, reset } from "../features/event/eventSlice";
import { useEffect } from "react";
import routeMap from "../images/routeMap.jpeg";
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
      <VStack spacing={4} align={'flex-start'}>
        <Text fontWeight={700}fontSize={'lg'} >About the Event</Text>
        {event.eventDetails.eventDescription.split('<br/>').map((para) => (
          <Text fontWeight={400} fontSize={'sm'} >{para}</Text>
        ))}
      </VStack>

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
          Leaderboard - Individual
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
      
      <RaceInstructions />

    </VStack>
  ));
}

export default Dashboard;
