/**
 * This component is going to store and display team leaderboard scores so that
 * ReturnItem can be mapped to display the data
 */

import { Text, Box, Flex, HStack, VStack, Spacer} from '@chakra-ui/react'
import { MdVerified } from 'react-icons/md'

function ResultTeamItem(props) {

  const formatDate = (uglyDate) => {
    const monthArr = [
      " Jan ",
      " Feb ",
      " Mar ",
      " Apr ",
      " May ",
      " Jun ",
      " Jul ",
      " Aug ",
      " Sep ",
      " Oct ",
      " Nov ",
      " Dec "
    ];
    const year = uglyDate.substring(0, 4);
    const month = monthArr[parseInt(uglyDate.substring(5, 7)) - 1];
    const day = uglyDate.substring(8, 10);
    const prettyDate = day + month + year;
    return prettyDate;
  };

  let [institution, results, totalRunTime] = props.entry

  return (
    <Flex direction={'column'} >
      <Flex bg={'primary.100'} borderTopRadius={'lg'} justifyContent={'space-between'} p={4} >
        <HStack spacing={4} >
          <Box borderRadius={'lg'} bg={'primary.200'} p={2.5} >{'#' + String(props.idx + 1).padStart(3, '0')}</Box>
          <Flex direction={'column'}>
            <Text fontWeight={400} fontSize={'sm'} color={'primary.800'} >{ institution }</Text>
          </Flex>
        </HStack>
        <Text fontWeight={700} fontSize={'md'} color={'primary.800'} >{totalRunTime}</Text>
      </Flex>

      <VStack bg={'primary.200'} borderBottomRadius={'lg'} p={4} spacing={1} >
        {results.map((result) => (
          <Flex w='100%'>
            <Text fontWeight={400} fontSize={'sm'} color={'primary.600'} >{result.firstName + ' ' + result.lastName}</Text>
            <Spacer/>
            <HStack>
              <Text fontWeight={400} fontSize={'sm'} color={'primary.600'} >{formatDate(result.createdAt)}</Text>
              {result.verified ? (
                <MdVerified/>
              ) : (null)}
            </HStack>
          </Flex>
        ))}
      </VStack>
    </Flex>
  )
}

export default ResultTeamItem