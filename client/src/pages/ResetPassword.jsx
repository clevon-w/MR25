// Reset password page after clicking link in email
import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuth, resetPw } from "../features/auth/authSlice";
import {
  authenticateResetPassword,
  resetResetPwAuth,
} from "../features/auth/resetPwAuthSlice";
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
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toast = useToast();

  const token = window.location.pathname.split("/").pop();

  const { updatedUser, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const {
    user,
    isErrorResetAuth,
    isSuccessResetAuth,
    isLoadingResetAuth,
    messageResetAuth,
  } = useSelector((state) => state.resetPwAuth);

  const passwordNoMatch =
    resetForm.password !== resetForm.confirmPassword &&
    resetForm.confirmPassword !== "";

  const toLogin = (e) => {
    dispatch(resetAuth());
    navigate("/login");
  };

  const toForgetPassword = (e) => {
    navigate("/forgetPassword");
  };

  useEffect(() => {
    dispatch(authenticateResetPassword(token));

    return () => {
      dispatch(resetResetPwAuth());
    };
  }, []);

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
      const formData = {
        userId: user.data._id,
        password: resetForm.password,
        password2: resetForm.confirmPassword,
      };

      dispatch(resetPw(formData));
    }
  };

  if (isLoading || isLoadingResetAuth) {
    return <Runningman />;
  } else if (isErrorResetAuth) {
    return (
      <Stack spacing={4} align="flex-start">
        <Text textStyle={"heading_s"}>
          Password reset link is invalid or has expired
        </Text>
        <Button variant="solid" onClick={toForgetPassword}>
          Request for another reset link
        </Button>
      </Stack>
    );
    return <Text></Text>;
  } else if (isSuccess) {
    return (
      <Stack spacing={4} align="flex-start">
        <Text textStyle={"heading_s"}>Password Reset Successfully</Text>
        <Button variant="ghost" onClick={toLogin}>
          To Login
        </Button>
      </Stack>
    );
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

              <FormControl isRequired>
                <InputGroup size="md">
                  <Input
                    name="password"
                    value={resetForm.password}
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    onChange={onChange}
                    placeholder="New Password"
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
                    name="confirmPassword"
                    value={resetForm.confirmPassword}
                    pr="4.5rem"
                    type={show2 ? "text" : "password"}
                    onChange={onChange}
                    placeholder="Confirm New Password"
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
            </Stack>
          </form>
        </Container>
      </>
    );
  }
}
export default ResetPassword;
