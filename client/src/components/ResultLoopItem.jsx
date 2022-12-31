/**
 * This component is going to store and display individual leaderboard scores so that the function
 * ReturnItem() can be mapped to display the data
 */

import { Text, Box, Flex, HStack } from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";
import { formatDateDDMonYYYY, changeTimezone } from "../utils/helperFunctions";

function ResultLoopItem(props) {
  return (
    <Flex direction={"column"}>
      <Flex
        bg={"primary.100"}
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
          </Flex>
        </HStack>

        <Flex direction={"column"} alignItems={"end"}>
          {props.result.loops != null ? (
            <>
              <HStack>
                <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                  {props.result.loops + " loops"}
                </Text>
                {props.result.loopsVerified ? <MdVerified /> : null}
              </HStack>
              <Text fontWeight={400} fontSize={"sm"} color={"primary.800"}>
                {"Last ran: " +
                  formatDateDDMonYYYY(
                    changeTimezone(
                      new Date(props.result.runDate),
                      "Asia/Singapore"
                    ).toISOString()
                  )}
              </Text>
            </>
          ) : (
            <>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                DQ
              </Text>
              <Text fontWeight={400} fontSize={"sm"} color={"primary.800"}>
                {props.result.DQreason}
              </Text>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ResultLoopItem;
