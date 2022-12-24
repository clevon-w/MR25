/**
 * This component is going to store and display individual leaderboard scores so that the function
 * ReturnItem() can be mapped to display the data
 */

import { Text, Box, Flex, HStack } from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";

function UsersItem(props) {
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
          <Flex direction={["column", "row"]}>
            <Flex direction={"column"}>
              <Text fontWeight={400} fontSize={"sm"} color={"primary.800"}>
                {props.user.firstName + " " + props.user.lastName}
              </Text>
              <Text fontWeight={400} fontSize={"sm"} color={"primary.600"}>
                {props.user.email}
              </Text>
            </Flex>
            <Flex direction={["row", "column"]}>
              <Text
                fontWeight={700}
                fontSize={"sm"}
                color={"primary.800"}
                mr={2}
              >
                User Role:
              </Text>
              <Text fontWeight={400} fontSize={"sm"} color={"primary.600"}>
                {props.user.userrole === 1 ? "Admin" : "Runner"}
              </Text>
            </Flex>

            <Flex direction={["row", "column"]}>
              <Text
                fontWeight={700}
                fontSize={"sm"}
                color={"primary.800"}
                mr={2}
              >
                Registration Status:
              </Text>
              <Text fontWeight={400} fontSize={"sm"} color={"primary.600"}>
                {props.user.registeredEvents.length === 0
                  ? "Not Registered"
                  : props.user.registeredEvents[0]["634e3415d68ee70244ecc53f"]
                      .pending}
              </Text>
            </Flex>
          </Flex>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default UsersItem;
