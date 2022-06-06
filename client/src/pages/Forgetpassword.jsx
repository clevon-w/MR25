// Forget password page
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetpassword, resetAuth } from "../features/auth/authSlice";
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
import { emailRegex } from "../utils/regex";

function Forgetpassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const toastId = "recovery-email-sent";
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
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

    if ((isSuccess || user) && !toast.isActive(toastId)) {
      // if (!toast.isActive(toastId)) {
      toast({
        toastId,
        title: "Recovery email sent",
        status: "success",
        isClosable: true,
      });
      // }
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
    };

    dispatch(forgetpassword(userData));
  };
  return (
    <Center h="100%">
      <Container maxW="md">
        <Text textStyle="heading_s" pb={4}>
          Forget password
        </Text>
        <Text>
          Enter the email address associated with your account and we'll send
          you a link to reset your password
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
            <Button
              type="submit"
              color="primary.white"
              bg="primary.800"
              size="lg"
            >
              Continue
            </Button>
          </Stack>
        </form>
      </Container>
    </Center>
  );
}
export default Forgetpassword;
