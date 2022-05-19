// import {
//   Box,
//   Flex,
//   Text,
//   IconButton,
//   Button,
//   Stack,
//   Collapse,
//   Icon,
//   Link,
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   useColorModeValue,
//   useBreakpointValue,
//   useDisclosure,
// } from '@chakra-ui/react'

// import {
//   HamburgerIcon,
//   CloseIcon,
//   ChevronDownIcon,
//   ChevronRightIcon,
// } from '@chakra-ui/icons'

// import { useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { logout, reset } from '../features/auth/authSlice'

// function Header() {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const { user } = useSelector((state) => state.auth)

  // const onLogout = () => {
  //   dispatch(logout())
  //   dispatch(reset())
  //   navigate('/')
  // }

  // const toLogin = () => {
  //   navigate('/login')
  // }

  // const toRegister = () => {
  //   navigate('/register')
  // }

  // const toDashboard = () => {
  //   navigate('/')
  // }

//   const { isOpen, onToggle } = useDisclosure()

//   return (
//     <Box>
//       <Flex
//         bg={useColorModeValue('white', 'gray.800')}
//         color={useColorModeValue('gray.600', 'white')}
//         minH={'60px'}
//         py={{ base: 2 }}
//         px={{ base: 4 }}
//         borderBottom={1}
//         borderStyle={'solid'}
//         borderColor={useColorModeValue('gray.200', 'gray.900')}
//         align={'center'}>
//         <Flex
//           flex={{ base: 1, md: 'auto' }}
//           ml={{ base: -2 }}
//           display={{ base: 'flex', md: 'none' }}>
//           <IconButton
//             onClick={onToggle}
//             icon={
//               isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
//             }
//             variant={'ghost'}
//             aria-label={'Toggle Navigation'}/>
//         </Flex>
//         <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
//           <Text
//             textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
//             fontFamily={'heading'}
//             color={useColorModeValue('gray.800', 'white')}
//             onClick={toDashboard}>
//             MR25
//           </Text>

      //   </Flex>
      //     {user ? (
      //       <Stack
      //         flex={{ base: 1, md: 0 }}
      //         justify={'flex-end'}
      //         direction={'row'}
      //         spacing={6}>
      //         <Button
      //           as={'a'}
      //           fontSize={'sm'}
      //           fontWeight={400}
      //           variant={'link'}
      //           href={'#'}
      //           onClick={onLogout}>
      //           Logout
      //         </Button>
      //       </Stack>
      //     ) : (
      //       <Stack
      //         flex={{ base: 1, md: 0 }}
      //         justify={'flex-end'}
      //         direction={'row'}
      //         spacing={6}>
      //         <Button
      //           as={'a'}
      //           fontSize={'sm'}
      //           fontWeight={400}
      //           variant={'link'}
      //           href={'#'}
      //           onClick={toLogin}>
      //           Sign In
      //         </Button>
      //         <Button
      //           display={{ base: 'none', md: 'inline-flex' }}
      //           fontSize={'sm'}
      //           fontWeight={600}
      //           color={'white'}
      //           bg={'blue.400'}
      //           href={'#'}
      //           _hover={{ bg: 'blue.300' }}
      //           onClick={toRegister}>
      //           Sign Up
      //         </Button>
      //       </Stack>
      //     )}
      // </Flex>
//     </Box>
//   )
// }


// export default Header

import React, { useState } from "react"
import { Link, Box, Flex, Text, Button, Stack, Divider } from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import Logo from "./Logo"

/**
 * The main header that will be exported.
 * The components in this header is all below it.
 * To add more stuff into the tabs, just add it into the menu links component.
 */
const Header = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <NavBarContainer {...props}>
      <Logo w="100px" />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
      <Divider borderColor={"primary.900"} opacity={1} borderBottomWidth={2} marginTop={6} />
    </NavBarContainer>
  )
}

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon color={"primary.800"} /> : <HamburgerIcon color={"primary.800"} />}
    </Box>
  )
}

const MenuItem = ({ children, isSelected, to, ...rest }) => {
  const [hover, setHover] = useState(false)

  return (
    // <Link href={to}>
      <Text 
        display="block"
        {...rest}
        onClick={to}
        fontSize={'md'}
        fontWeight={700}
        color={hover || isSelected ? "primary.800" : "primary.600"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)} >
          {children}
      </Text>
    // </Link>
  )
}

const MenuLinks = ({ isOpen }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  
  const toDashboard = () => {
    navigate('/')
  }

  const toLogin = () => {
    navigate('/login')
  }

  const toRegisterEvent = () => {
    navigate('/registerEvent')
  }

  const toLeaderboard = () => {
    navigate('/leaderboard')
  }

  const toLogout = () => {
    dispatch(logout())
    dispatch(reset())
    toDashboard()
  }

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}>
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}>
        <MenuItem isSelected={window.location.pathname === "/"} to={toDashboard}>About MR25</MenuItem>
        <MenuItem isSelected={window.location.pathname === "/registerEvent"} to={toRegisterEvent}>Register</MenuItem>
        <MenuItem isSelected={window.location.pathname === "/leaderboard"} to={toLeaderboard}>Leaderboard</MenuItem>
        {user ? (
          <Button
            fontSize={'md'}
            color={'primary.white'}
            bg={'primary.800'}
            fontWeight={700}
            onClick={toLogout}>
            Logout
          </Button>
        ) : (
          <Button
            fontSize={'md'}
            fontWeight={700}
            color={'primary.white'}
            bg={'primary.800'}
            onClick={toLogin}>
            Login
          </Button>
        )}
      </Stack>
    </Box>
  )
}

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["transparent", "transparent", "transparent", "transparent"]}
      color={["white", "white", "white", "white"]}
      {...props}>
      {children}
    </Flex>
  )
}

export default Header