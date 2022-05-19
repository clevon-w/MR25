import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import{useSelector, useDispatch} from 'react-redux'
import { getResults, reset } from '../features/results/resultSlice'
import ResultItem from '../components/ResultItem'
import { Container, 
         Heading, 
         Stack,
         Select,
         Flex,
         Box,
         Text } from "@chakra-ui/react";





function Leaderboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { results, isLoading, isError, message } = useSelector(
    (state) => state.results
  )
  const { data } = useSelector(
    (state) => state.results.results
  )

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(!user) {
      navigate('/login')
    }
  
    dispatch(getResults())
  
    return () => {
      dispatch(reset)
    }
  
    
  }, [user, navigate, isError, message, dispatch])
  return (
    <Container>
      <Stack spacing={4}>
        <Heading>Leaderboard</Heading>

        <Flex>
          <Box>
            <Heading size='sm'>Category</Heading>
            <Select placeholder='Select option'>
              <option value="MU15">Men's under 15</option>
              <option value='WU15'>Womans's under 15</option>
            </Select>
          </Box>
          <Box>
            <Heading size='sm'>Invidivual or Team</Heading>
            <Select placeholder='Select option'>
              <option value='individual'>Individual</option>
              <option value='team'>Team</option>
            </Select>
          </Box>
        </Flex>

        <Box>
          {data.length > 0 ? (
            <Box>
              {data.map((result) => (
                <ResultItem key={result._id} result = {result} />
              ))}
            </Box>
          ) : <Text>No results to display at the moment</Text>}
        </Box>
      </Stack>
      

    </Container>

  )
}

export default Leaderboard