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
  ListItem
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, reset } from "../features/event/eventSlice";
import { useEffect } from "react";
import routeMap from "../images/routeMap.jpeg";
import { FiCalendar, FiMapPin, FiCheckCircle, FiXCircle } from "react-icons/fi";

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

  const formatDate = (uglyDate) => {
    const monthArr = [
      " Jan ",
      " Feb ",
      " Mar ",
      " Apr ",
      " May ",
      " Jun ",
      " Jul ",
      " Aug ",
      " Sep ",
      " Oct ",
      " Nov ",
      " Dec "
    ];
    const year = uglyDate.substring(0, 4);
    const month = monthArr[parseInt(uglyDate.substring(5, 7)) - 1];
    const day = uglyDate.substring(8, 10);
    const prettyDate = day + month + year;
    return prettyDate;
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
          <Text fontSize={"xl"} fontWeight={700}>
            {event.name}
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
                as={checkRegistered(event) ? FiCheckCircle : FiXCircle}
                color={checkRegistered(event) ? "accents.green" : "accents.red"}
              />
              <TagLabel>
                {checkRegistered(event) ? "Registered" : "Not Registered"}
              </TagLabel>
            </Tag>
          ) : (
            <></>
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

      <VStack spacing={4} align={"flex-start"}>
        <Text fontWeight={700} fontSize={"md"}>
          Description
        </Text>
        <Text fontWeight={400} fontSize={"sm"}>
          {event.eventDetails.eventDescription}
        </Text>
      </VStack>

      <Grid w={"100%"} templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <Text fontWeight={700} fontSize={"md"}>
            Event details
          </Text>
        </GridItem>
        <GridItem colSpan={[2, 1]}>
          <Tag size={"lg"} variant="subtle" w={"100%"} p={4}>
            <TagLeftIcon boxSize={"24px"} as={FiCalendar} />
            <TagLabel>
              {formatDate(event.eventDetails.eventStart) +
                " - " +
                formatDate(event.eventDetails.eventEnd)}
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
        <UnorderedList>
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
            <TagLabel>{formatDate(event.eventDetails.finalDate)}</TagLabel>
          </Tag>
        </GridItem>
        <GridItem colSpan={[2, 1]}>
          <Tag size={"lg"} variant="subtle" w={"100%"} p={4}>
            <TagLeftIcon boxSize={"24px"} as={FiMapPin} />
            <TagLabel>{event.eventDetails.finalLocation}</TagLabel>
          </Tag>
        </GridItem>
        <GridItem colSpan={2}>
          <Text fontWeight={400} fontSize={"sm"}>
            {event.eventDetails.finalDescription}
          </Text>
        </GridItem>
      </Grid>
    </VStack>
  ));
}

export default Dashboard;
