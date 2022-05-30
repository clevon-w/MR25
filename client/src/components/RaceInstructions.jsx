/**
 * This file contains the static content for virtual race instructions
 * since the race instructions are repeated in multiple pages
 */

import React from "react"
import { VStack, Text, Link, UnorderedList, OrderedList, ListItem } from "@chakra-ui/react"

function RaceInstructions() {
  return (
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
          https://www.strava.com/clubs/VAMR5km
        </Link>{" "}
        and click the “Request to Join” button (need not wait for approval to start your run)
      </Text>
      <VStack spacing={2} align={"flex-start"}>
        <Text fontWeight={400} fontSize={"sm"} >
          Important notes:
        </Text>
        <UnorderedList px={4} >
          <ListItem fontWeight={400} fontSize={"sm"} >
            Please set the name in your Strava app to the name you registered with for this race.
          </ListItem>
          <ListItem fontWeight={400} fontSize={"sm"} >
            Please set the privacy setting for Activities in your Strava app to “Everyone” or “Followers” during the race period to facilitate the verification of the run by the organiser.  
          </ListItem>
          <ListItem fontWeight={400} fontSize={"sm"} >
            Please note that by joining the “club” VA MacRitchie Trail 5km Blended Challenge 2022 on Strava, all your run records will be visible to the organiser for the purpose of result verification. This Strava club will be deleted once the event is over.
          </ListItem>
          <ListItem fontWeight={400} fontSize={"sm"} >
            Please approve Vision Athletics’ request to follow your Strava activities. 
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
  )
}

export default RaceInstructions