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
  FormLabel,
  FormHelperText,
  Heading,
  Box,
  Container,
  Flex,
  Spacer,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
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

  const {
    firstName,
    lastName,
    email,
    gender,
    birthDate,
    nric,
    password,
    password2,
  } = formData;

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
        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            <Heading>Create Account</Heading>
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

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input name="email" value={email} onChange={onChange} />
              <FormHelperText>We'll never share your email</FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
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
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  name="password2"
                  value={password2}
                  pr="4.5rem"
                  type={show2 ? "text" : "password"}
                  onChange={onChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick2}>
                    {show2 ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>
                NRIC / FIN (last 3 dights and ending alphabet)
              </FormLabel>
              <Input
                name="nric"
                value={nric}
                onChange={onChange}
                placeholder="789Z"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Birth Date (DD/MM/YYYY)</FormLabel>
              <Input
                name="birthDate"
                value={birthDate}
                onChange={onChange}
                placeholder="01/01/2000"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Select name="gender" placeholder="Gender" onChange={onChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </FormControl>

            <Button type="submit" colorScheme="telegram" size="lg">
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
