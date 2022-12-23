/**
 * This component is going to store and display individual leaderboard scores so that the function
 * ReturnItem() can be mapped to display the data
 */
import { Text, Flex, HStack } from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";

function MyResultItem(props) {
  return (
    <Flex
      bg={"primary.100"}
      borderRadius={"lg"}
      justifyContent={"space-between"}
      p={4}
      direction={["column", "row"]}
    >
      <Flex direction={["row", "column"]} alignItems={"start"}>
        <Text fontWeight={400} fontSize={"md"} color={"primary.800"} mr={2}>
          Run Date:
        </Text>
        <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
          {formatDateDDMonYYYY(props.result.runDate)}
        </Text>
      </Flex>
      <Flex direction={["row", "column"]} alignItems={"start"}>
        <Text fontWeight={400} fontSize={"md"} color={"primary.800"} mr={2}>
          Run Distance:
        </Text>
        <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
          {props.result.runDistance}
        </Text>
      </Flex>
      <Flex direction={["row", "column"]} alignItems={"start"}>
        <Text fontWeight={400} fontSize={"md"} color={"primary.800"} mr={2}>
          Run Timing:
        </Text>
        <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
          {props.result.runTiming}
        </Text>
      </Flex>
      <Flex direction={["row", "column"]} alignItems={"start"}>
        <Text fontWeight={400} fontSize={"md"} color={"primary.800"} mr={2}>
          API:
        </Text>
        <HStack>
          <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
            {props.result.calculatedAPI}
          </Text>
          {props.result.apiVerified ? <MdVerified /> : null}
        </HStack>
      </Flex>
      <Flex direction={["row", "column"]} alignItems={"start"}>
        <Text fontWeight={400} fontSize={"md"} color={"primary.800"} mr={2}>
          Loops:
        </Text>
        <HStack>
          <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
            {props.result.loops}
          </Text>
          {props.result.loopsVerified ? <MdVerified /> : null}
        </HStack>
      </Flex>
    </Flex>
  );
}

export default MyResultItem;
