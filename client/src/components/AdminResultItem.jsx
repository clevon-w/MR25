/**
 * This component is going to store and display individual leaderboard scores so that the function
 * ReturnItem() can be mapped to display the data
 */

import { Text, Box, Flex, HStack, useToast, FormControl, FormLabel, Select, Button } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, resetAuth } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function AdminResultItem(props) {
  // const finalist = props.index <= 8 && props.result.verified;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { data } = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    _id: data._id,
    resultstatus: data.verified,
  });

  const { _id, resultstaxstus } = formData;

  const [resultstatus, setResultStatus] = useBoolean();

  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value
  //   }));
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      resultstatus,
    };

    const args = {
      id: _id,
      data: userData
    };

    console.log(formData.resultstatus);
    dispatch(update(args));
    console.log(formData.resultstatus);
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: "error",
        isClosable: true
      });
    }
    if (isSuccess) {
      toast({
        title: "Results verification changed successfully!",
        status: "success",
        isClosable: true
      });
      // navigate("/");
      // return () => {
      //   dispatch(resetAuth());
      // };
    }
  }, [user, isError, isSuccess, message, dispatch, navigate, toast]);


  return (
    <>
    <form onSubmit={onSubmit}>
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
              <Text fontWeight={400} fontSize={"sm"} color={"primary.600"}>
                {props.result.institution}
              </Text>
            </Flex>
          </HStack>

          {/* <Select name="gender" onChange={handleChange}>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </Select> */}

          <Flex direction={"column"}>
            <HStack>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                {props.result.runTiming}
              </Text>
              {/* {props.result.verified ? <MdVerified /> : null} */}
              <FormControl isRequired>
              <FormLabel>Status</FormLabel>
              <Select name="resultstatus" placeholder="Status" onChange={onChange}>
                <option value={true}>
                  Verified
                </option>
                <option value={false}>
                  Not verified
                </option>
              </Select>
            </FormControl>
            </HStack>
            <Text fontWeight={400} fontSize={"sm"} color={"primary.600"}>
              {formatDateDDMonYYYY(props.result.runDate)}
            </Text>
          </Flex>

          <Button
            type="submit"
            color="primary.white"
            bg="primary.800"
            size="lg"
          >
            Update
            <CheckIcon w={8} />
          </Button>
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
    </form>
    </>
  );
}

export default AdminResultItem;