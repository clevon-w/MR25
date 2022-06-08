// Reset password page after clicking link in email
import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, resetAuth } from "../features/auth/authSlice";
import { emailRegex, nricRegex } from "../utils/regex";
import { FiEyeOff, FiEye } from "react-icons/fi";
import Runningman from "../components/Runningman";

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

function ResetPassword() {
  const [resetForm, setResetForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // const [update, setUpdate] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const toastId = "reset-pw-success";

  const { user, isLoading, isError, updated, message } = useSelector(
    (state) => state.auth
  );
  const invalidEmail =
    !emailRegex.test(resetForm.email) && resetForm.email !== "";

  const passwordNoMatch =
    resetForm.password !== resetForm.confirmPassword &&
    resetForm.confirmPassword !== "";

  const toLogin = (e) => {
    navigate("/login");
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: "Problem resetting password. Please send another reset link.",
        isClosable: true,
      });
    }

    if ((updated || user) && !toast.isActive(toastId)) {
      toast({
        toastId,
        title:
          "Your password has been successfully reset, please try logging in again.",
        status: "success",
        isClosable: true,
      });
      // }
      navigate("/");
    }

    dispatch(resetAuth());
  }, [user, isError, updated, message, navigate, dispatch, toast]);

  const onChange = (e) => {
    setResetForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = () => {
    setShow(!show);
  };

  const handleClick2 = () => {
    setShow2(!show2);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (resetForm.password !== resetForm.confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        isClosable: true,
      });
    } else {
      dispatch(reset(resetForm));
    }
  };

  if (isLoading) {
    return <Runningman />;
  } else if (isError) {
    return <Text>error la bodoh</Text>;
  } else {
    // Reset password page
    return (
      <>
        <Container maxW="md">
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <Text textStyle="heading_s" pb={4}>
                Reset Password
              </Text>

              <FormControl isRequired isInvalid={invalidEmail}>
                <Input
                  name="email"
                  type="email"
                  value={resetForm.email}
                  onChange={onChange}
                  placeholder="E-mail"
                />
                {invalidEmail ? (
                  <FormErrorMessage>Invalid e-mail address.</FormErrorMessage>
                ) : null}
              </FormControl>

              <FormControl isRequired>
                <InputGroup size="md">
                  <Input
                    name="password"
                    value={resetForm.password}
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

              <FormControl isRequired isInvalid={passwordNoMatch}>
                <InputGroup size="md">
                  <Input
                    name="password2"
                    value={resetForm.confirmPassword}
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
                {passwordNoMatch ? (
                  <FormErrorMessage>Passwords do not match.</FormErrorMessage>
                ) : null}
              </FormControl>
              <Button
                type="submit"
                color="primary.white"
                bg="primary.800"
                size="lg"
              >
                Update password
              </Button>
              <Button variant="ghost" onClick={toLogin}>
                To login
              </Button>
            </Stack>
          </form>
        </Container>
      </>
    );
  }
}
export default ResetPassword;
