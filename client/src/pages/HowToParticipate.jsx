/**
 * The dashboard, aka the main page, aka the home page,
 * is also the page where the user will learn about the events
 * since there is only one event, it will be the About MR25 page
 */
import React from "react";
import {
  Container,
  Center,
  Text,
  Image,
  UnorderedList,
  ListItem
} from "@chakra-ui/react";
import MR25_paynowQR from "../images/MR25_paynowQR.jpeg";
import joinStravaClub from "../images/join-strava-club.jpeg";

function HowToParticipate() {
  return (
    <Container>
      <Text textStyle="heading_s" pb={6}>
        How can I participate?
      </Text>
      <Text textStyle="heading_xs">Step 1: Register</Text>
      <Text pb={4}>
        Create an account and submit the registration form here.
      </Text>
      <Text textStyle="heading_xs">Step 2: Registration fee</Text>
      <Text>
        Kindly pay via PayNow (Scan QR code below or enter UEN: 52911537M).
      </Text>
      <Center w="100%">
        <Image src={MR25_paynowQR} alt="MR25 Paynow QR code." maxH="360px" />
      </Center>
      <UnorderedList pb={4}>
        <ListItem>
          <b>Amount: </b>$20.00 (non-refundable)
        </ListItem>
        <ListItem>
          <b>Reference no.: </b>Last 3 digits and ending alphabet of your NRIC
          or FIN.
        </ListItem>
      </UnorderedList>
      <Text pb={4}>
        Please email a screenshot of your payment to{" "}
        <b>vision_athletics@yahoo.com</b>
      </Text>
      <Text textStyle="heading_xs">Step 3: Join our Strava club</Text>
      <Text pb={4}>
        Submit a request to join our Strava club. Your request to join will be
        approved once you have completed steps 1 and 2.
      </Text>
      <UnorderedList pb={4}>
        <ListItem>
          <b>Club name: </b>VA MacRitchie Trail 5km Blended Challenge 2022
        </ListItem>
      </UnorderedList>
      <Center w="100%" pb={4}>
        <Image
          src={joinStravaClub}
          alt="Join Strava Club screenshot."
          maxH="560px"
        />
      </Center>
      <Text as="i" color="primary.600">
        Note: The Vision Athletics Strava "club" is created for result
        verification purposes. You have to remain in the club throughout the
        race period. This club will be disbanded once the event is over.
      </Text>
      <Text textStyle="heading_xs" pt={4}>
        Done 🎉
      </Text>
      <Text>
        You will receive a confirmation email from vision_athletics@yahoo.com
        upon completion of the above steps. Welcome to the event!
      </Text>
    </Container>
  );
}
export default HowToParticipate;