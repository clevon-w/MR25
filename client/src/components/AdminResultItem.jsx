/**
 * This component is going to store and display individual leaderboard scores so that the function
 * ReturnItem() can be mapped to display the data
 */

import {
  Text,
  Box,
  Flex,
  HStack,
  useToast,
  FormControl,
  FormLabel,
  Select,
  Button,
  Switch,
  Checkbox,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateResult, resetResult } from "../features/results/resultSlice";
import { useNavigate } from "react-router-dom";
import { useBoolean } from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";

function AdminResultItem(props) {
  // const finalist = props.index <= 8 && props.result.verified;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const data = props.result;

  const [formData, setFormData] = useState({
    _id: data._id,
    loopsVerified: data.loopsVerified,
    apiVerified: data.apiVerified,
    rejected: data.rejected,
    userid: user._id,
  });

  const { _id, loopsVerified, apiVerified, rejected, userid } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      loopsVerified,
      apiVerified,
      rejected,
      userid,
    };

    const args = {
      id: _id,
      data: userData,
    };

    dispatch(updateResult(args));
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
    if (isSuccess) {
      toast({
        title: "Results verification changed successfully!",
        status: "success",
        isClosable: true,
      });
      dispatch(resetResult);
      navigate("/AdminPage");
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
            borderTopRadius={"lg"}
            borderBottomRadius={"none"}
            justifyContent={"space-between"}
            p={4}
          >
            <Flex direction={"column"}>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Name:
              </Text>
              <Text fontWeight={400} fontSize={"sm"} color={"primary.800"}>
                {props.result.firstName + " " + props.result.lastName}
              </Text>
            </Flex>

            <Flex direction={"column"}>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Run Timing:
              </Text>
              <Text fontWeight={400} fontSize={"md"} color={"primary.800"}>
                {props.result.runTiming}
              </Text>
            </Flex>

            <Flex direction={"column"}>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Run Date:
              </Text>
              <Text fontWeight={400} fontSize={"sm"} color={"primary.600"}>
                {formatDateDDMonYYYY(props.result.runDate)}
              </Text>
            </Flex>

            <Flex direction={"column"}>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                API:
              </Text>
              <Text fontWeight={400} fontSize={"md"} color={"primary.800"}>
                {props.result.calculatedAPI}
              </Text>

              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                API Verified:
              </Text>
              <Text fontWeight={400} fontSize={"md"} color={"primary.800"}>
                {props.result.apiVerified ? "True" : "False"}
              </Text>
            </Flex>

            <Flex direction={"column"}>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Loops:
              </Text>
              <Text fontWeight={400} fontSize={"md"} color={"primary.800"}>
                {props.result.loops}
              </Text>

              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Loops Verified:
              </Text>
              <Text fontWeight={400} fontSize={"md"} color={"primary.800"}>
                {props.result.loopsVerified ? "True" : "False"}
              </Text>
            </Flex>

            <Flex direction={"column"}>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Rejected:
              </Text>
              <Text fontWeight={400} fontSize={"md"} color={"primary.800"}>
                {props.result.rejected ? "True" : "False"}
              </Text>
            </Flex>
          </Flex>
          <Flex
            bg={"primary.200"}
            borderBottomRadius={"lg"}
            // justifyContent={"flex-end"}
            alignItems={"center"}
            p={2.5}
          >
            <FormControl display={"flex"} justifyContent={"space-evenly"}>
              <Checkbox
                name="apiVerified"
                defaultChecked={apiVerified}
                onChange={onChange}
                colorScheme={"green"}
              >
                Verify API
              </Checkbox>
              <Checkbox
                name="loopsVerified"
                defaultChecked={loopsVerified}
                onChange={onChange}
                colorScheme={"green"}
              >
                Verify Loops
              </Checkbox>
              <Checkbox
                name="rejected"
                defaultChecked={rejected}
                onChange={onChange}
                colorScheme={"green"}
              >
                Rejected
              </Checkbox>
            </FormControl>
            <Button type="submit" backgroundColor={"accents.red"}>
              Confirm
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
