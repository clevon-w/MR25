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
  Text,
  Container
} from "@chakra-ui/react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

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
        isClosable: true
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
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
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
    return <Spinner />;
  }

  return (
    <Center h="100%">
      <Container maxW="md">
        <Text textStyle="heading_s" pb={4}>
          Welcome
        </Text>
        <form onSubmit={onSubmit}>
          <FormControl>
            <Stack spacing={1}>
              <InputGroup pb={2}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={FiMail} color="primary.600" />}
                />
                <Input
                  name="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={onChange}
                />
              </InputGroup>

              <InputGroup size="md" pb={4}>
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
                    cursor: "pointer"
                  }}
                >
                  {show ? (
                    <Icon as={FiEyeOff} color="primary.800" />
                  ) : (
                    <Icon as={FiEye} color="primary.800" />
                  )}
                </InputRightElement>
              </InputGroup>

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
          </FormControl>
        </form>
      </Container>
    </Center>
  );
}
export default Login;
