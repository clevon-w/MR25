/**
 * Register account Page
 */
import { React } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useToast,
  Select,
  Spinner,
  Button,
  Stack,
  InputGroup,
  FormControl,
  FormHelperText,
  Text,
  Box,
  Container,
  Flex,
  Spacer,
  Input,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { FiEyeOff, FiEye } from "react-icons/fi";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import { register, reset } from "../features/auth/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    birthDate: "",
    nric: "",
    password: "",
    password2: "",
  });
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, toast]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const toLogin = (e) => {
    navigate("/login");
  };

  const handleClick = () => {
    setShow(!show);
  };

  const handleClick2 = () => {
    setShow2(!show2);
  };

  // For date-picker:
  // const [date, setDate] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      toast({
        title: "Passwords do not match",
        status: "error",
        isClosable: true,
      });
    } else {
      dispatch(register(formData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  /**
   * creating the register form
   */
  return (
    <>
      <Container maxW="md">
        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            <Text textStyle="heading_s" pb={4}>
              Create Account
            </Text>
            <Flex>
              <Box w="48.25%">
                <FormControl isRequired>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChange}
                    placeholder="First Name"
                  />
                </FormControl>
              </Box>
              <Spacer />
              <Box w="48.25%">
                <FormControl isRequired>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={onChange}
                    placeholder="Last Name"
                  />
                </FormControl>
              </Box>
            </Flex>

            <FormControl isRequired>
              <Input
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="E-mail"
              />
            </FormControl>

            <FormControl isRequired>
              <InputGroup size="md">
                <Input
                  name="password"
                  value={formData.password}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  onChange={onChange}
                  placeholder="Password"
                />
                <InputRightElement
                  onClick={handleClick}
                  _hover={{
                    cursor: "pointer",
                  }}
                >
                  {show ? (
                    <Icon as={FiEyeOff} color="primary.800" />
                  ) : (
                    <Icon as={FiEye} color="primary.800" />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <InputGroup size="md">
                <Input
                  name="password2"
                  value={formData.password2}
                  pr="4.5rem"
                  type={show2 ? "text" : "password"}
                  onChange={onChange}
                  placeholder="Confirm Password"
                />
                <InputRightElement
                  onClick={handleClick2}
                  _hover={{
                    cursor: "pointer",
                  }}
                >
                  {show2 ? (
                    <Icon as={FiEyeOff} color="primary.800" />
                  ) : (
                    <Icon as={FiEye} color="primary.800" />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <Input
                name="nric"
                value={formData.nric}
                onChange={onChange}
                placeholder="NRIC/FIN (e.g. 789Z)"
              />
              <FormHelperText>Last 3 digits and ending alphabet</FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <Input
                name="birthDate"
                value={formData.birthDate}
                pr="9px"
                type="date"
                onChange={onChange}
              />
              <FormHelperText>Birth date</FormHelperText>
              {/* <DatePicker
                placeholderText="Birth Date (MM/DD/YYY)"
                selected={date} // Need this prop to display the selected date in the UI.
                onChange={(datePickerValue) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    birthDate: datePickerValue,
                  }));
                  setDate(datePickerValue);
                }}
                showPopperArrow={false}
                isClearable
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
              /> */}
            </FormControl>

            <FormControl isRequired>
              <Select name="gender" placeholder="Gender" onChange={onChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </FormControl>

            <Button
              type="submit"
              color="primary.white"
              bg="primary.800"
              size="lg"
            >
              Create Account
            </Button>
            <Button variant="ghost" onClick={toLogin}>
              Already have an account? Login here.
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default Register;
