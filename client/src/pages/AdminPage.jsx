import { React } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, resetUsers } from "../features/users/usersSlice";
import { getResults, resetResult } from "../features/results/resultSlice";
import UsersItem from "../components/UsersItem";
import {
  Stack,
  VStack,
  Select,
  Grid,
  Text,
  GridItem,
  Alert,
  AlertIcon,
  InputGroup,
  Input,
  InputRightElement,
  HStack,
  useToast,
  useMouseDownRef,
} from "@chakra-ui/react";

import Runningman from "../components/Runningman";
import { MdSearchOff, MdSmartDisplay, MdVerified } from "react-icons/md";


function AdminPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { user } = useSelector((state) => state.auth);
  const { results } = useSelector((state) => state.results);

  const { isLoading, isError, message, users } = useSelector(
    (state) => state.users
  );

  // function searchUsers(users){
  //   let filteredUsers = users.filter((user) => {
  //     // Check if gender of result is same and gender filter
  //         return (
  //           user
  //             .toString()
  //             .toLowerCase()
  //             .indexOf(query.toLowerCase()) > -1
  //         );
  //     return false;
  //   });
  // }

  useEffect(() => {

    if (isError) {
      console.log(message);
    }

    dispatch(getUsers());
    dispatch(getResults());

    if (user.data.userrole === 0) {
      toast({
        title:
          "No permission to enter page",
        status: "error",
        isClosable: true,
      });
      navigate("/");
    } 

    return () => {
      dispatch(resetUsers);
      dispatch(resetResult);
    }


  }, [
    dispatch,
    navigate,
    // isSuccess,
    isError,
    message,
    toast,
  ]);


  // console.log(userdata);
  console.log(users.length);
  console.log(results);


  if (isLoading) {
    return <Runningman />;
      } else {
    return (
      <Stack spacing={8}>
        <Text textStyle="heading_s">User database</Text>

        <VStack align="stretch">
            <HStack justifyContent={"center"}>
              <MdSearchOff size={"5em"} />
              <Text fontSize={"md"} fontWeight={700}>
                There are no users in the database
              </Text>
            </HStack>
        </VStack>

        <VStack align="stretch">
          {users.length == 0 ? (
            <HStack justifyContent={"center"}>
              <MdSearchOff size={"5em"} />
              <Text fontSize={"md"} fontWeight={700}>
                No users found
              </Text>
            </HStack>
          ) : (
            users.map((user, index) => (
              <UsersItem user={user} index={index} />
            ))
          )}
        </VStack>

        <HStack>
          <MdVerified />
          <Text fontSize={"sm"} fontWeight={400}>
          </Text>
        </HStack>
      </Stack>
    );
  }
}
export default AdminPage;
