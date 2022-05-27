import React from "react";
import { Center, Image } from "@chakra-ui/react";
import logo from "../images/logo.png";

function Logo(props) {
  return (
    <Center {...props}>
      <Image src={logo} alt="Logo" maxH="50px" />
    </Center>
  );
}

export default Logo;
