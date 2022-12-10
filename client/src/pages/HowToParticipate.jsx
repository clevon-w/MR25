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
  ListItem,
  Link,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  HStack,
} from "@chakra-ui/react";
import { FaEllipsisH, FaEllipsisV } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import android1 from "../images/android1.jpg";
import android2 from "../images/android2.jpg";
import android3 from "../images/android3.jpg";
import android4 from "../images/android4.jpg";
import android5 from "../images/android5.jpg";
import android6 from "../images/android6.jpg";
import android7 from "../images/android7.jpg";
import android8 from "../images/android8.jpg";
import android9 from "../images/android9.jpg";
import android10 from "../images/android10.jpg";
import ios1 from "../images/ios1.jpg";
import ios2 from "../images/ios2.jpg";
import ios3 from "../images/ios3.jpg";
import ios4 from "../images/ios4.jpg";
import ios5 from "../images/ios5.jpg";
import ios6 from "../images/ios6.jpg";
import ios7 from "../images/ios7.jpg";
import ios8 from "../images/ios8.jpg";
import ios9 from "../images/ios9.jpg";
import follow1 from "../images/follow1.jpeg";
import follow2 from "../images/follow2.jpeg";
import follow3 from "../images/follow3.jpeg";
import follow4 from "../images/follow4.jpeg";
import MR25_paynowQR from "../images/MR25_paynowQR.jpeg";
import joinStravaClub from "../images/join-strava-club.jpeg";
import RaceInstructions from "../components/RaceInstructions";

let androidSetupKMData = [
  {
    title: 'Step 1: Select "Settings" from top right corner of your phone',
    image: android1,
  },
  { title: 'Step 2: Select "Display"', image: android2 },
  { title: 'Step 3: Select "Units of Measurement"', image: android3 },
  { title: 'Step 4: Select "Metric"', image: android4 },
];

let iosSetupKMData = [
  {
    title: 'Step 1: Select "Settings" from top right corner of your phone',
    image: ios1,
  },
  { title: 'Step 2: Select "Kilometres"', image: ios2 },
];

let followMR25 = [
  {
    title: "Step 1: Click on the Friends icon on the top left corner.",
    image: follow1,
  },
  {
    title: "Step 2: Search for “MR25 2022” and click “Follow”",
    image: follow2,
  },
  {
    title:
      "Step 3: Click on the above notification which you will receive in the next 24 hours after doing Step 2.",
    image: follow3,
  },
  {
    title:
      "Step 4: Click on the “Respond” button on top and follow by the “Approve” button at the bottom of the screen.",
    image: follow4,
  },
];

function HowToParticipate() {
  return (
    <Container>
      <Text textStyle="heading_s" pb={6}>
        How can I participate?
      </Text>
      <Text textStyle="heading_xs">Step 1: Create user account</Text>
      <Text fontWeight={400} fontSize={"sm"} pb={4}>
        Login to your account{" "}
        <Link color="teal.500" href="./login">
          here
        </Link>{" "}
        or create an account{" "}
        <Link color="teal.500" href="./register">
          here
        </Link>
        .
      </Text>
      <Text textStyle="heading_xs">Step 2: Register for the event</Text>
      <Text fontWeight={400} fontSize={"sm"} pb={4}>
        Submit the event registration form{" "}
        <Link color="teal.500" href="./registerEvent">
          here
        </Link>
        .
      </Text>

      {/* <Text textStyle="heading_xs">Step 2: Registration fee</Text>
      <Text fontWeight={400} fontSize={"sm"}>
        Kindly pay via PayNow (Scan QR code below or enter UEN: 52911537M).
      </Text>
      <Center w="100%">
        <Image src={MR25_paynowQR} alt="VAMR Paynow QR code." maxH="360px" />
      </Center>
      <UnorderedList pb={4} fontSize={"sm"}>
        <ListItem>
          <b>Amount: </b>$20.00 (non-refundable)
        </ListItem>
        <ListItem>
          <b>Reference no.: </b>Last 3 digits and ending alphabet of your NRIC
          or FIN.
        </ListItem>
      </UnorderedList>
      <Text fontWeight={400} fontSize={"sm"} pb={4}>
        Please email a screenshot of your payment to{" "}
        <b>vision_athletics@yahoo.com</b>
      </Text> */}
      <Text textStyle="heading_xs">Step 3: Follow "MR25 2022" on Strava</Text>
      <Text fontWeight={400} fontSize={"sm"}>
        Request to follow MR25 2022. Respond and approve the request to follow
        you once you receive the notification. This is to facilitate the
        verification and validation of your runs. Follow the instructions below.
      </Text>
      <Accordion allowMultiple pt={2}>
        {followMR25.map((accordionData) => (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {accordionData.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Center w={"100%"}>
                <Image w={"50%"} src={accordionData.image} />
              </Center>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      {/* <Text fontWeight={400} fontSize={"sm"} pb={4}>
        Submit a request to join our Strava club. Your request to join will be
        approved once you have completed step 1.
      </Text>
      <UnorderedList pb={4} fontSize={"sm"}>
        <ListItem>
          <b>Club name: </b>
          <Link
            color="teal.500"
            href=" https://www.strava.com/clubs/VAMR5km"
            isExternal
          >
            VA MacRitchie Trail 5km Blended Challenge 2022
            <Icon as={FiExternalLink} mx="2px" />
          </Link>
        </ListItem>
      </UnorderedList>
      <Center w="100%" pb={4}>
        <Image
          src={joinStravaClub}
          alt="Join Strava Club screenshot."
          maxH="560px"
        />
      </Center>
      <Text as="i" color="primary.600" fontSize={"sm"}>
        Please note that by joining the “club” VA MacRitchie Trail 5km Blended
        Challenge 2022 on Strava, all your run records will be visible to the
        organiser for the purpose of result verification. This Strava club will
        be deleted once the event is over.
      </Text> */}
      <Text textStyle="heading_xs" pt={4}>
        Done 🎉
      </Text>
      <Text fontWeight={400} fontSize={"sm"} pb={8}>
        Upon registration, read the race instruction below and START RUNNING
        during the stipulated event period!
      </Text>
      <RaceInstructions />
      <Text textStyle={"heading_s"} py={6} id={"setupGuide"}>
        Guide to setting up Strava
      </Text>
      <Tabs isFitted size="sm">
        <TabList mb="1em">
          <Tab>Android</Tab>
          <Tab>Apple</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text textStyle={"heading_xs"}>Setting measurement to km</Text>
            <Accordion allowMultiple>
              {androidSetupKMData.map((accordionData) => (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {accordionData.title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Center w={"100%"}>
                      <Image w={"50%"} src={accordionData.image} />
                    </Center>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            <Text textStyle={"heading_xs"} pt={6}>
              Converting Moving Time to Elapsed Time
            </Text>
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Step 1: Tap on activity bar
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={android5} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Text>Step 2: Click on the </Text>
                        <FaEllipsisV />
                        <Text>icon</Text>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={android6} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Step 3: Select "Edit Activity"
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={android7} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Step 4: Select "Race"
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={android8} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Step 5: Select "Save"
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={android9} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Step 6: "Race" and "Elapsed Time" should appear here
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={android10} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>

          <TabPanel>
            <Text textStyle={"heading_xs"}>Setting measurement to km</Text>
            <Accordion allowMultiple>
              {iosSetupKMData.map((accordionData) => (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {accordionData.title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Center w={"100%"}>
                      <Image w={"50%"} src={accordionData.image} />
                    </Center>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            <Text textStyle={"heading_xs"} pt={6}>
              Converting Moving Time to Elapsed Time
            </Text>
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Step 1: Tap on activity bar
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={ios3} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Text>Step 2: Select</Text>
                        <FaEllipsisH />
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={ios4} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Step 3: Select "Edit Activity"
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={ios5} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Step 4: Select "Type of run"
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={ios6} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Step 5: Scroll to and select "Race" before clicking on "x"
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={ios7} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Step 6: "Race" should appear, then select "Update
                      Activity"
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={ios8} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Step 7: "Race" and "Elapsed Time" should appear here
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Center w={"100%"}>
                    <Image w={"50%"} src={ios9} />
                  </Center>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
export default HowToParticipate;
