import { React } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Text,
  useToast,
  Select,
  Button,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Heading,
  Box,
  Container,
  Flex,
  Spacer,
  Input,
} from "@chakra-ui/react";
import { update, resetAuth } from "../features/auth/authSlice";
import { formatDateYYYYMMDD } from "../utils/helperFunctions";

//checkicon for Update button
import { CheckIcon } from "@chakra-ui/icons";

import { emailRegex, nricRegex } from "../utils/regex";

function UpdateUser() {
  /**
   * creating the register form
   */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { data } = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    _id: data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    gender: data.gender,
    birthDate: data.birthDate,
    nric: data.nric,
  });

  // For validating email input. True if email is INVALID.
  const invalidEmail =
    !emailRegex.test(formData.email) && formData.email !== "";
  // For validating NRIC input. True if NRIC is INVALID.
  const invalidNric =
    !nricRegex.test(formData.nric.toUpperCase()) && formData.nric !== "";

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { _id, firstName, lastName, email, gender, birthDate, nric } = formData;

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
        title: "Updated personal particulars successfully!",
        status: "success",
        isClosable: true,
      });
      navigate("/MyAccount");
      return () => {
        dispatch(resetAuth());
      };
    }
  }, [user, isError, isSuccess, message, navigate, dispatch, toast]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formData.email = formData.email.toLowerCase();
    const userData = {
      _id,
      firstName,
      lastName,
      email,
      gender,
      birthDate,
      nric,
    };

    const args = {
      id: _id,
      data: userData,
    };

    dispatch(update(args));
  };

  return (
    <>
      <Container>
        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            <Heading>My Account</Heading>
            <Heading size="md">Personal particulars</Heading>
            <Text fontSize={14}>
              Your personal particulars will be autofilled when you register for
              events or upload results.
            </Text>
            <Flex>
              <Box w="45%">
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                  />
                </FormControl>
              </Box>
              <Spacer />
              <Box w="45%">
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input name="lastName" value={lastName} onChange={onChange} />
                </FormControl>
              </Box>
            </Flex>

            <FormControl isRequired isInvalid={invalidEmail}>
              <FormLabel>E-mail</FormLabel>

              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                placeholder="E-mail"
              />
              {invalidEmail ? (
                <FormErrorMessage>Invalid e-mail address.</FormErrorMessage>
              ) : null}
            </FormControl>
            {/* <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input name="email" value={email} onChange={onChange} />
            </FormControl> */}

            <FormControl isRequired isInvalid={invalidNric}>
              <FormLabel>NRIC / FIN</FormLabel>
              <Input
                name="nric"
                value={formData.nric.toUpperCase()}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value.toUpperCase(),
                  }));
                }}
                placeholder="NRIC/FIN (e.g. 789Z)"
              />
              <FormHelperText>Last 3 digits and ending alphabet</FormHelperText>
              {invalidNric ? (
                <FormErrorMessage>Invalid NRIC or FIN format.</FormErrorMessage>
              ) : null}
            </FormControl>

            {/* <FormControl isRequired>
              <FormLabel>
                NRIC / FIN (last 3 dights and ending alphabet)
              </FormLabel>
              <Input
                name="nric"
                value={nric}
                onChange={onChange}
                placeholder="789Z"
              />
            </FormControl> */}

            <FormControl isRequired>
              <FormLabel>Birth Date</FormLabel>
              <Input
                name="birthDate"
                type="date"
                value={formatDateYYYYMMDD(formData.birthDate)}
                onChange={onChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Select name="gender" placeholder="Gender" onChange={onChange}>
                <option selected={gender === "Male"} value="Male">
                  Male
                </option>
                <option selected={gender === "Female"} value="Female">
                  Female
                </option>
              </Select>
            </FormControl>

            <Button
              type="submit"
              color="primary.white"
              bg="primary.800"
              size="lg"
            >
              Update
              <CheckIcon w={8} />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                navigate("/MyAccount");
              }}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}
export default UpdateUser;
