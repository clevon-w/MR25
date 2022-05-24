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
              <option value='MU15'>Men's Under 15</option>
              <option value='MU18'>Men's Under 18</option>
              <option value='MU21'>Men's Under 21</option>
              <option value='MU23'>Men's Under 15</option>
              <option value='MOPEN'>Men's Open</option>
              <option value='MO50'>Men's Above 50</option>
              
              <option value='WU15'>Women's under 15</option>
              <option value='WU18'>Women's under 18</option>
              <option value='WU21'>Women's Under 21</option>
              <option value='WU23'>Women's Under 15</option>
              <option value='WOPEN'>Women's Open</option>
              <option value='WO50'>Women's Above 50</option>
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

      
      </Stack>
      

    </Container>

  )
}

export default Leaderboard