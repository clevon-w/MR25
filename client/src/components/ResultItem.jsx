/**
 * This component is going to store and display individual leaderboard scores so that the function
 * ReturnItem() can be mapped to display the data
 */

import { Text, Box, Flex, HStack } from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";
import { formatDateDDMonYYYY, changeTimezone } from "../utils/helperFunctions";

function ResultItem(props) {
  // const finalist = props.index <= 8 && props.result.verified;

  return (
    <Flex direction={"column"}>
      <Flex
        bg={"primary.100"}
        // borderTopRadius={"lg"}
        // borderBottomRadius={finalist ? "none" : "lg"}
        borderRadius={"lg"}
        justifyContent={"space-between"}
        p={4}
      >
        <HStack spacing={4}>
          <Box borderRadius={"lg"} bg={"primary.200"} p={2.5}>
            {"#" + String(props.index + 1).padStart(3, "0")}
          </Box>
          <Flex direction={"column"}>
            <Text fontWeight={400} fontSize={"sm"} color={"primary.800"}>
              {props.result.firstName + " " + props.result.lastName}
            </Text>
            {/* <Text fontWeight={400} fontSize={"sm"} color={"primary.600"}>
              {props.result.institution}
            </Text> */}
          </Flex>
        </HStack>

        <Flex direction={"column"} alignItems={"end"}>
          <HStack>
            <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
              {props.result.calculatedAPI}
            </Text>
            {props.result.apiVerified ? <MdVerified /> : null}
          </HStack>
          <Text fontWeight={400} fontSize={"sm"} color={"primary.600"}>
            {formatDateDDMonYYYY(
              changeTimezone(
                new Date(props.result.runDate),
                "Asia/Singapore"
              ).toISOString()
            )}
          </Text>
        </Flex>
      </Flex>
      {/* {finalist ? (
        <Flex
          bg={"primary.200"}
          borderBottomRadius={"lg"}
          justifyContent={"flex-end"}
          p={2.5}
        >
          <Text fontWeight={400} fontSize={"xs"} color={"primary.800"}>
            Qualified for Grand Finale
          </Text>
        </Flex>
      ) : null} */}
    </Flex>
  );
}

export default ResultItem;
