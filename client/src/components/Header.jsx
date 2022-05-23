import React, { useState } from "react"
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  Stack, 
  Divider, 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ButtonGroup
} from "@chakra-ui/react";
import {
  CloseIcon,
  HamburgerIcon,
  AddIcon,
  ChevronDownIcon
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import Logo from "./Logo";

/**
 * The main header that will be exported.
 * The components in this header is all below it.
 * To add more stuff into the tabs, just add it into the menu links component.
 */
const Header = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const toLogin = () => {
    navigate('/login')
  }

  const toRegister = () => {
    navigate('/register')
  }

  const toLeaderboard = () => {
    navigate('/leaderboard')
  }

  const toMyAccount = () => {
    navigate('/myAccount')
  }

  const { isOpen, onToggle } = useDisclosure();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <NavBarContainer {...props}>
        <Logo w="100px" />
        <NavBarToggle toggle={toggle} isOpen={isOpen} />
        <NavBarLinks isOpen={isOpen} />
      </NavBarContainer>
      <Divider
        borderColor={"primary.800"}
        opacity={1}
        borderBottomWidth={1.5}
      />
    </>
  );
};

const NavBarToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? (
        <CloseIcon color={"primary.800"} />
      ) : (
        <HamburgerIcon color={"primary.800"} />
      )}
    </Box>
  );
};

const NavBarItem = ({ children, isSelected, to, ...rest }) => {
  return (
    <Button
      size="md"
      variant="ghost"
      color={isSelected ? "primary.800" : "primary.600"}
      bg={isSelected ? "primary.200" : "transparent"}
      onClick={to}
      _hover={{
        color: "primary.800",
        background: "primary.200"
      }}
    >
      {children}
    </Button>
  );
};


const NavBarLinks = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const toDashboard = () => {
    navigate("/");
  };

  const toLogin = () => {
    navigate("/login");
  };

  const toRegisterEvent = () => {
    navigate("/registerEvent");
  };

  const toLeaderboard = () => {
    navigate("/leaderboard");
  };

  const toAccount = () => {
    navigate("/myAccount");
  };

  const toMyResults = () => {
    navigate("/myResults");
  };

  const toUploadResult = () => {
    navigate("/uploadResult");
  };

  const toLogout = () => {
    dispatch(logout());
    dispatch(reset());
    toDashboard();
  };

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={4}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <ButtonGroup gap="2">
          <NavBarItem
            isSelected={window.location.pathname === "/"}
            to={toDashboard}
          >
            About MR25
          </NavBarItem>
          <NavBarItem
            isSelected={window.location.pathname === "/registerEvent"}
            to={toRegisterEvent}
          >
            Register
          </NavBarItem>
          <NavBarItem
            isSelected={window.location.pathname === "/leaderboard"}
            to={toLeaderboard}
          >
            Leaderboard
          </NavBarItem>
        </ButtonGroup>
        {user ? (
          <Flex>
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Button
                variant="outline"
                borderColor={"primary.800"}
                opacity={1}
                borderWidth={2}
                rightIcon={<AddIcon color={"primary.800"} />}
                color={"primary.800"}
                fontSize={"md"}
                fontWeight={700}
                onClick={toUploadResult}
              >
                Upload result
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  fontSize={"md"}
                  color={"primary.white"}
                  bg={"primary.800"}
                  fontWeight={700}
                  rightIcon={<ChevronDownIcon />}
                >
                  {user.data.firstName + " " + user.data.lastName}
                </MenuButton>
                <MenuList
                  borderColor={"primary.900"}
                  opacity={1}
                  borderWidth={2}
                >
                  <MenuItem onClick={toAccount} color={"primary.900"}>
                    My Account
                  </MenuItem>
                  <MenuItem onClick={toMyResults} color={"primary.900"}>
                    My Results
                  </MenuItem>
                  <MenuItem onClick={toLogout} color={"accents.red"}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        ) : (
          <Button
            fontSize={"md"}
            fontWeight={700}
            color={"primary.white"}
            bg={"primary.800"}
            onClick={toLogin}
          >
            Login
          </Button>
        )}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg={["transparent", "transparent", "transparent", "transparent"]}
      color={["white", "white", "white", "white"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Header;
