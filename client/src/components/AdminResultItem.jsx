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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";
import { useEffect, useState, useRef } from "react";
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
    userid: props.user._id,
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

  // ALERT DIALOG SCRIPTS
  const {
    isOpen: isAD1Open,
    onOpen: onAD1Open,
    onClose: onAD1Close,
  } = useDisclosure();
  const cancelAD1Ref = useRef();

  const closeAD1 = (e) => {
    onAD1Close();
    onSubmit(e);
  };

  // useEffect(() => {
  //   if (isError) {
  //     toast({
  //       title: message,
  //       status: "error",
  //       isClosable: true,
  //     });
  //   }
  //   if (isSuccess) {
  //     toast({
  //       title: "Results verification changed successfully!",
  //       status: "success",
  //       isClosable: true,
  //     });
  //     dispatch(resetResult);
  //     navigate("/AdminPage");
  //     // navigate("/");
  //     // return () => {
  //     //   dispatch(resetAuth());
  //     // };
  //   }
  // }, [user, isError, isSuccess, message, dispatch, navigate, toast]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <AlertDialog
          isOpen={isAD1Open}
          leastDestructiveRef={cancelAD1Ref}
          onClose={closeAD1}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Are all the result updates correct?
              </AlertDialogHeader>

              <AlertDialogBody>
                <Stack spacing={2}>
                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>Name:</Text>
                    <Text fontWeight={400}>
                      {props.result.firstName + " " + props.result.lastName}
                    </Text>
                  </HStack>

                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>API Verified:</Text>
                    <Text fontWeight={400}>
                      {apiVerified ? "True" : "False"}
                    </Text>
                  </HStack>

                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>Loops Verifed:</Text>
                    <Text fontWeight={400}>
                      {loopsVerified ? "True" : "False"}
                    </Text>
                  </HStack>

                  <HStack spacing={4} fontSize={"sm"}>
                    <Text fontWeight={700}>Rejected:</Text>
                    <Text fontWeight={400}>{rejected ? "True" : "False"}</Text>
                  </HStack>
                </Stack>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelAD1Ref} onClick={onAD1Close}>
                  No
                </Button>
                <Button
                  colorScheme="red"
                  type="submit"
                  onClick={closeAD1}
                  ml={3}
                >
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <Flex direction={"column"}>
          <Flex
            bg={"primary.100"}
            borderTopRadius={"lg"}
            borderBottomRadius={"none"}
            justifyContent={"space-between"}
            p={4}
            direction={["column", "row"]}
          >
            <Flex direction={["row", "column"]}>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Name:
              </Text>
              <Text
                fontWeight={400}
                fontSize={"sm"}
                color={"primary.800"}
                pb={2.5}
              >
                {props.result.firstName + " " + props.result.lastName}
              </Text>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Age:
              </Text>
              <Text fontWeight={400} fontSize={"sm"} color={"primary.800"}>
                {props.result.age}
              </Text>
            </Flex>

            <Flex direction={["row", "column"]}>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Run Timing:
              </Text>
              <Text fontWeight={400} fontSize={"md"} color={"primary.800"}>
                {props.result.runTiming}
              </Text>
            </Flex>

            <Flex direction={["row", "column"]}>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Run Date:
              </Text>
              <Text
                fontWeight={400}
                fontSize={"sm"}
                color={"primary.600"}
                pb={2.5}
              >
                {formatDateDDMonYYYY(props.result.runDate)}
              </Text>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Upload Date:
              </Text>
              <Text fontWeight={400} fontSize={"sm"} color={"primary.600"}>
                {formatDateDDMonYYYY(props.result.createdAt)}
              </Text>
            </Flex>

            <Flex direction={["row", "column"]}>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                API:
              </Text>
              <Text
                fontWeight={400}
                fontSize={"md"}
                color={"primary.800"}
                pb={2.5}
              >
                {props.result.calculatedAPI}
              </Text>

              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                API Verified:
              </Text>
              <Text fontWeight={400} fontSize={"md"} color={"primary.800"}>
                {props.result.apiVerified ? "True" : "False"}
              </Text>
            </Flex>

            <Flex direction={["row", "column"]}>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Loops:
              </Text>
              <Text
                fontWeight={400}
                fontSize={"md"}
                color={"primary.800"}
                pb={2.5}
              >
                {props.result.loops}
              </Text>

              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Loops Verified:
              </Text>
              <Text fontWeight={400} fontSize={"md"} color={"primary.800"}>
                {props.result.loopsVerified ? "True" : "False"}
              </Text>
            </Flex>

            <Flex direction={["row", "column"]}>
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
            <FormControl
              display={"flex"}
              direction={["column", "row"]}
              justifyContent={"space-evenly"}
            >
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
            <Button onClick={onAD1Open} backgroundColor={"accents.red"}>
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
