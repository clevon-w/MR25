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
  Center,
  FormControl,
  Text,
  Box,
  Container,
} from "@chakra-ui/react";
import { register, reset } from "../features/auth/authSlice";
import { Input, InputRightElement } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";

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
    insitution: "",
  });

  const {
    firstName,
    lastName,
    email,
    gender,
    birthDate,
    nric,
    password,
    password2,
    insitution,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [show, setShow] = useState(false);

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

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast({
        title: "Passwords do not match",
        status: "error",
        isClosable: true,
      });
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        gender,
        birthDate,
        nric,
        password,
        insitution,
      };

      dispatch(register(userData));
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
      <Container>
        <Text fontSize="40px">Create Account</Text>
        <FormControl onSubmit={onSubmit}>
          <Stack spacing={0}>
            <Flex>
              <Box w="45%">
                <Text>First Name</Text>
                <Input name="firstName" value={firstName} onChange={onChange} />
              </Box>
              <Spacer />
              <Box w="45%">
                <Text>Last Name</Text>
                <Input name="lastName" value={lastName} onChange={onChange} />
              </Box>
            </Flex>

            <Text>Email</Text>
            <Input name="email" value={email} onChange={onChange} />

            <Text>Password</Text>
            <InputGroup size="md">
              <Input
                name="password"
                value={password}
                pr="4.5rem"
                type={show ? "text" : "password"}
                onChange={onChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Text>Confirm Password</Text>
            <InputGroup size="md">
              <Input
                name="password2"
                value={password2}
                pr="4.5rem"
                type={show ? "text" : "password"}
                onChange={onChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Text>NRIC / FIN (last 3 dights and ending alphabet)</Text>
            <Input
              name="nric"
              value={nric}
              onChange={onChange}
              placeholder="789Z"
            />

            <Text>Birth Date (DD/MM/YYYY)</Text>
            <Input
              name="birthDate"
              value={birthDate}
              onChange={onChange}
              placeholder="01/01/2000"
            />

            <Text>Gender</Text>
            <Select name="gender" placeholder="Gender" onChange={onChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>

            <Flex>
              <Text>Institution(if applicable)</Text>
              <Spacer />
              <Text as="cite">Optional</Text>
            </Flex>
            <Input name="institution" value={insitution} onChange={onChange} />

            <Button type="submit" colorScheme="telegram" size="lg">
              Create Account
            </Button>
            <Button variant="ghost" onClick={toLogin}>
              Already have an account? Login here.
            </Button>
          </Stack>
        </FormControl>
      </Container>
    </>
  );
}

export default Register;
