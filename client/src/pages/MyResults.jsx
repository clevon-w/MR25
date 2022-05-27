/**
 * The dashboard, aka the main page, aka the home page,
 * is also the page where the user will learn about the events
 * since there is only one event, it will be the About MR25 page
 */
import React from "react";
import { Container, Text } from "@chakra-ui/react";

function MyResults() {
  return (
    <Container>
      <Text textStyle="heading_s" pb={6}>
        My Results
      </Text>
      <Text textStyle="heading_xs">Coming soon 👀</Text>
    </Container>
  );
}
export default MyResults;
