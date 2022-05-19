import React from "react"
import { Box, Text } from "@chakra-ui/react"

function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="md" fontWeight={700} color={"primary.800"}>
        MR25
      </Text>
    </Box>
  )
}

export default Logo