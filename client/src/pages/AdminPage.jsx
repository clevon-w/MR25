import { React } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../features/users/usersSlice";
import {
  Stack,
  FormControl,
  FormLabel,
  Text,
  Container,
  Input,
  Button,
  HStack,
  SimpleGrid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Link,
} from "@chakra-ui/react";


function AdminPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { events } = useSelector((state) => state.events);

  const { data } = useSelector((state) => state.auth.user);

  const { results, isLoading, isError, message } = useSelector(
    (state) => state.results
  );



  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (data.userrole === 0) {
      toast({
        title:
          "No permission to enter page",
        status: "error",
        isClosable: true,
      });
      navigate("/dashboard");
    } 

    dispatch(getUsers());
  }, [
    dispatch,
    navigate,
    // isSuccess,
    isError,
    message,
    toast,
  ]);


  // if (isLoading || !(user.length > 0)) {
  //   return <Runningman />;
  // } else {
  //   return (
  //     <Stack spacing={8}>
  //       <Text textStyle="heading_s">Leaderboard</Text>

  //       <Grid w={"100%"} templateColumns="repeat(2, 1fr)" gap={4}>
  //         <GridItem colSpan={1}>
  //           <Text fontWeight={700} fontSize={"sm"}>
  //             Event Format
  //           </Text>
  //           <Select onChange={handleChange} name="eventFormat">
  //             <option value={"A"}>Event A - Age Performance Index</option>
  //             <option value={"B"}>Event B - Most Number of 10.5km Loops</option>
  //             <option value={"C"}>
  //               Event C - Seoul Garden -MR25 Ultramarathon
  //             </option>
  //           </Select>
  //         </GridItem>
  //         <GridItem colSpan={1}>
  //           <Text fontWeight={700} fontSize={"sm"}>
  //             Gender
  //           </Text>
  //           <Select name="gender" onChange={handleChange}>
  //             <option value={"Male"}>Male</option>
  //             <option value={"Female"}>Female</option>
  //           </Select>
  //         </GridItem>
  //       </Grid>

  //       <Alert
  //         status="info"
  //         borderRadius={"lg"}
  //         borderColor={"accents.blue"}
  //         borderWidth={"thin"}
  //       >
  //         <AlertIcon color={"accents.blue"} />
  //         {filterParam.eventFormat === "A"
  //           ? "The Age Performance Index is an indication of how close the participant is to the extrapolated age standard (100 being equal; >100 - exceeding the age standard) calculated based on the MR25 All-Inclusive 10.5km Trail Performance Index, a performance grading system that factors the runner’s age and gender. Please refer to the Table of Extrapolated Age Standards below"
  //           : filterParam.eventFormat === "B"
  //           ? "At the end of the qualifying period, on 19 Dec, the top 30 male and 30 female with the highest number of loops during the qualifying period will be invited to participate in the finals on 31 Dec."
  //           : "Check back on 31 Dec 2022 for live results of the finals!"}
  //       </Alert>

  //       <InputGroup>
  //         <Input
  //           placeholder={"Search athlete or institution"}
  //           value={query}
  //           onChange={(e) => setQuery(e.target.value)}
  //         />
  //         <InputRightElement children={<SearchIcon />} />
  //       </InputGroup>

  //       <VStack align="stretch">
  //         {searchedResults.length == 0 ? (
  //           <HStack justifyContent={"center"}>
  //             <MdSearchOff size={"5em"} />
  //             <Text fontSize={"md"} fontWeight={700}>
  //               No results have been uploaded in this category yet
  //             </Text>
  //           </HStack>
  //         ) : (
  //           searchedResults.map((result, index) => (
  //             <ResultItem result={result} user={user} index={index} />
  //           ))
  //         )}
  //       </VStack>
  //       <HStack>
  //         <MdVerified />
  //         <Text fontSize={"sm"} fontWeight={400}>
  //           Result verified
  //         </Text>
  //       </HStack>
  //     </Stack>
  //   );
  // }
}
export default AdminPage;
