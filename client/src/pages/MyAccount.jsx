import {
  Container,
  Text,
  Stack,
  Button,
  Flex,
  Spacer,
  HStack
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDateYYYYMMDD } from "../utils/helperFunctions";

function MyAccount() {
  const navigate = useNavigate();

  /**
   * state.auth retrieves the states of the user
   * state.auth.user retrieves the data stored in the paylaod
   */
  const { data } = useSelector((state) => state.auth.user);

  const toUpdateUser = (e) => {
    navigate("/UpdateUser");
  };

  return (
    <>
      <Container>
        <Stack spacing={8} align={"flex-start"}>
          <Text fontWeight={700} fontSize={"2xl"}>
            My Account
          </Text>

          <Stack spacing={4}>
            <Flex>
              <Text fontWeight={700} fontSize={"md"}>
                Personal particulars
              </Text>
              <Spacer />
              <Button variant="link" size="sm" onClick={toUpdateUser}>
                Update
              </Button>
            </Flex>

            <Text fontWeight={400} fontSize={"sm"}>
              Your personal particulars will be autofilled when you register for
              events or upload results.
            </Text>

            <Stack spacing={2}>
              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>Name:</Text>
                <Text fontWeight={400}>
                  {data.firstName + " " + data.lastName}
                </Text>
              </HStack>

              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>DOB:</Text>
                <Text fontWeight={400}>
                  {formatDateYYYYMMDD(data.birthDate)}
                </Text>
              </HStack>

              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>Gender:</Text>
                <Text fontWeight={400}>{data.gender}</Text>
              </HStack>

              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>NRIC:</Text>
                <Text fontWeight={400}>{data.nric}</Text>
              </HStack>

              <HStack spacing={4} fontSize={"sm"}>
                <Text fontWeight={700}>E-mail:</Text>
                <Text fontWeight={400}>{data.email}</Text>
              </HStack>
            </Stack>
          </Stack>

          {/* <Text fontWeight={700} fontSize={'md'}>Settings</Text>

          <HStack spacing={4} fontSize={'sm'} >
            <Text fontWeight={700} >Password:</Text>
            <Text fontWeight={400} >{data.password}</Text>
          </HStack> */}
        </Stack>
      </Container>
    </>
  );
}

export default MyAccount;
