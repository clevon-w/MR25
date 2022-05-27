import React from "react";
import {
  Heading,
  Container,
  Text,
  Stack,
  Button,
  Flex,
  HStack
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";

function UploadSuccess() {
  const navigate = useNavigate();

  /**
   * state.auth retrieves the states of the user
   * state.auth.user retrieves the data stored in the paylaod
   */
  const { data } = useSelector((state) => state.auth.user);
  const { result } = useSelector((state) => state.result.result);

  const toLeaderBoard = () => {
    navigate("/Leaderboard");
  };

  const toUploadResults = () => {
    navigate("/UploadResults");
  };

  return (
    <Container>
      <Stack spacing={8}>
        <Text fontWeight={700} fontSize={"2xl"}>
          Upload Successful!
        </Text>

        <Stack spacing={4}>
          <Heading size="sm">Result</Heading>
          <Stack spacing={2}>
            <HStack spacing={4} fontSize={"sm"}>
              <Text fontWeight={700}>Uploaded on:</Text>
              <Text fontWeight={400}>
                {formatDateDDMonYYYY(result.createdAt)}
              </Text>
            </HStack>

            <HStack spacing={4} fontSize={"sm"}>
              <Text fontWeight={700}>Date of run:</Text>
              <Text fontWeight={400}>
                {formatDateDDMonYYYY(result.runDate)}
              </Text>
            </HStack>

            <HStack spacing={4} fontSize={"sm"}>
              <Text fontWeight={700}>
                Distance ran (as reflected on Strava):
              </Text>
              <Text fontWeight={400}>
                {formatDateDDMonYYYY(result.runDistance)}
              </Text>
            </HStack>

            <HStack spacing={4} fontSize={"sm"}>
              <Text fontWeight={700}>
                Time Clocked (as reflected on Strava):
              </Text>
              <Text fontWeight={400}>
                {formatDateDDMonYYYY(result.runTiming)}
              </Text>
            </HStack>

            {/* <HStack spacing={4} fontSize={'sm'} >
                <Text fontWeight={700} >Strava Screenshot:</Text>
                <Text fontWeight={400} >{result.screenshot}</Text>
              </HStack> */}

            <HStack spacing={4} fontSize={"sm"}>
              <Text fontWeight={700}>Category:</Text>
              <Text fontWeight={400}>{result.ageCategory}</Text>
            </HStack>

            <HStack spacing={4} fontSize={"sm"}>
              <Text fontWeight={700}>Verification:</Text>
              <Text fontWeight={400}>{result.verified}</Text>
            </HStack>
          </Stack>
        </Stack>

        <Stack spacing={4}>
          <Flex>
            <Text fontWeight={700} fontSize={"md"}>
              Personal particulars
            </Text>
          </Flex>

          <Stack spacing={2}>
            <HStack spacing={4} fontSize={"sm"}>
              <Text fontWeight={700}>Name:</Text>
              <Text fontWeight={400}>
                {data.firstName + " " + data.lastName}
              </Text>
            </HStack>

            <HStack spacing={4} fontSize={"sm"}>
              <Text fontWeight={700}>DOB:</Text>
              <Text fontWeight={400}>
                {formatDateDDMonYYYY(data.birthDate)}
              </Text>
            </HStack>

            <HStack spacing={4} fontSize={"sm"}>
              <Text fontWeight={700}>Gender:</Text>
              <Text fontWeight={400}>{data.gender}</Text>
            </HStack>

            <HStack spacing={4} fontSize={"sm"}>
              <Text fontWeight={700}>NRIC:</Text>
              <Text fontWeight={400}>{data.nric}</Text>
            </HStack>

            <HStack spacing={4} fontSize={"sm"}>
              <Text fontWeight={700}>E-mail:</Text>
              <Text fontWeight={400}>{data.email}</Text>
            </HStack>
          </Stack>
        </Stack>

        {/* <Text fontWeight={700} fontSize={'md'}>Settings</Text>

          <HStack spacing={4} fontSize={'sm'} >
            <Text fontWeight={700} >Password:</Text>
            <Text fontWeight={400} >{data.password}</Text>
          </HStack> */}

        <Button colorScheme="primary.800" size="lg" onClick={toLeaderBoard}>
          View LeaderBoard
        </Button>
        <Button variant="ghost" size="lg" onClick={toUploadResults}>
          Upload another result
        </Button>
      </Stack>
    </Container>
  );
}

export default UploadSuccess;
