/**
 * This component is going to store and display individual leaderboard scores so that the function 
 * ReturnItem() can be mapped to display the data
 */

import { Container, Text, Box, Stack } from '@chakra-ui/react'

function ResultItem({result}) {

  return (
    <Container>
      <Text>{result.distance}</Text>
    </Container>

  )
}

export default ResultItem