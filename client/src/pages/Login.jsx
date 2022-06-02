/**
 * Login Page
 */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useToast,
  Spinner,
  Button,
  Icon,
  Input,
  InputRightElement,
  InputLeftElement,
  Stack,
  InputGroup,
  Center,
  FormControl,
  FormErrorMessage,
  Text,
  Container,
} from "@chakra-ui/react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { login, resetAuth } from "../features/auth/authSlice";
import { emailRegex } from "../utils/regex";
import Runningman from "../components/Runningman";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // For showing/hiding password:
  const [show, setShow] = useState(false);

  // For validating email input. True if email is INVALID.
  const invalidEmail =
    !emailRegex.test(formData.email) && formData.email !== "";

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

    dispatch(resetAuth());
  }, [user, isError, isSuccess, message, navigate, dispatch, toast]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const handleClick = () => {
    setShow(!show);
  };

  const toRegister = (e) => {
    navigate("/register");
  };

  if (isLoading) {
    return <Runningman />;
  }

  return (
    <Center h="100%">
      <Container maxW="md">
        <Text textStyle="heading_s" pb={4}>
          Welcome
        </Text>
        <form onSubmit={onSubmit}>
          <Stack spacing={1}>
            {/* Email input */}
            <FormControl pb={2} isInvalid={invalidEmail} isRequired>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={FiMail} color="primary.600" />}
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={onChange}
                />
              </InputGroup>
              {invalidEmail ? (
                <FormErrorMessage>Invalid e-mail address.</FormErrorMessage>
              ) : null}
            </FormControl>

            {/* Password input */}
            <FormControl pb={4} isRequired>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={FiLock} color="primary.600" />}
                />
                <Input
                  placeholder="Password"
                  name="password"
                  value={password}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  onChange={onChange}
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

            <Button
              type="submit"
              color="primary.white"
              bg="primary.800"
              size="lg"
            >
              Login
            </Button>
            <Button variant="ghost" size="lg" onClick={toRegister}>
              No account? Create account here.
            </Button>
          </Stack>
        </form>
      </Container>
    </Center>
  );
}
export default Login;
