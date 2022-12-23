import { React } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, resetUsers } from "../features/users/usersSlice";
import { getResults, resetResult } from "../features/results/resultSlice";
import UsersItem from "../components/UsersItem";
import AdminResultItem from "../components/AdminResultItem";
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

    if (user.data.userrole !== 1) {
      toast({
        title: "No permission to enter page",
        status: "error",
        isClosable: true,
      });
      navigate("/");
    }

    return () => {
      dispatch(resetUsers());
      dispatch(resetResult());
    };
  }, [
    dispatch,
    navigate,
    // isSuccess,
    isError,
    message,
    toast,
  ]);

  const [filterParam, setFilterParam] = useState({
    format: "user",
    // gender: "Male",
  });

  const handleChange = (e) => {
    setFilterParam((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(filterParam.format);
  };

  if (!Array.isArray(results)) {
    toast({
      title: "Results updated successfully!",
      status: "success",
      isClosable: true,
    });
    dispatch(resetResult());
    dispatch(getResults());
  }

  if (isLoading) {
    return <Runningman />;
  } else {
    return (
      <Stack spacing={8}>
        <Text textStyle="heading_s">Database</Text>

        <Grid w={"100%"} templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={1}>
            <Text fontWeight={700} fontSize={"sm"}>
              Format
            </Text>
            <Select onChange={handleChange} name="format">
              <option value={"user"}>User database</option>
              <option value={"result"}>Results database</option>
            </Select>
          </GridItem>
          {/* <GridItem colSpan={1}>
            <Text fontWeight={700} fontSize={"sm"}>
              Gender
            </Text>
            <Select name="gender" onChange={handleChange}>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </Select>
          </GridItem> */}
        </Grid>

        <VStack align="stretch">
          {filterParam.format === "user" ? (
            users.length == 0 ? (
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
            )
          ) : results.length == 0 || !Array.isArray(results) ? (
            <HStack justifyContent={"center"}>
              <MdSearchOff size={"5em"} />
              <Text fontSize={"md"} fontWeight={700}>
                No results found
              </Text>
            </HStack>
          ) : (
            results.map((result, index) => (
              <AdminResultItem result={result} user={user} index={index} />
            ))
          )}
        </VStack>
      </Stack>
    );
  }
}
export default AdminPage;
