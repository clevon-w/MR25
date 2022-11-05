import { React } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { createResult, resetResult } from "../features/results/resultSlice";


function AdminPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();


  const { data } = useSelector((state) => state.auth.user);
  // const { events } = useSelector((state) => state.events);
  const { isError, isSuccess, message } = useSelector((state) => state.results);

  // eventid is hard coded at the moment
  // as we only have one event
  const [formData, setFormData] = useState({
    eventId: "62864db1e76d2b7a270da2df",
    runTiming: "",
    runDate: "",
    runDistance: "",
    loops: "",
    // screenshot: null,
    verified: false,
  });

  const [runTime, setRunTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });

  let {
    eventId,
    runTiming,
    // screenshot,
    verified,
    runDistance,
    runDate,
    loops,
  } = formData;


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
  }, [
    dispatch,
    navigate,
    isSuccess,
    isError,
    message,
    toast,
    data.registeredEvents.length,
  ]);


  return(<></>);
}
export default AdminPage;
