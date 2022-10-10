import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getResults, resetResult } from "../features/results/resultSlice";
import { getEvents } from "../features/event/eventSlice";
import ResultItem from "../components/ResultItem";
import ResultTeamItem from "../components/ResultTeamItem";
import {
  Stack,
  VStack,
  Select,
  Grid,
  Text,
  GridItem,
  Alert,
  AlertIcon,
  InputGroup,
  Input,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { MdSearchOff, MdVerified } from "react-icons/md";
import Runningman from "../components/Runningman";

function Leaderboard() {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.events);

  const { user } = useSelector((state) => state.auth);

  const { results, isLoading, isError, message } = useSelector(
    (state) => state.results
  );

  const [searchParam] = useState(["firstName", "lastName"]);
  const [query, setQuery] = useState("");
  const [filterParam, setFilterParam] = useState({
    eventFormat: "A",
    gender: "Male",
  });

  function sumTime(results) {
    let sumSeconds = 0;

    results.forEach((result) => {
      let a = result.runTiming.split(":");
      let seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      sumSeconds += seconds;
    });

    return new Date(sumSeconds * 1000).toISOString().substring(11, 19);
  }

  function search(results) {
    if (filterParam.eventFormat === "A") {
      // Filter based on gender and search
      let filteredResults = results.filter((result) => {
        // Check if gender of result is same and gender filter
        if (result.gender === filterParam.gender) {
          // Check for string typed into search bar
          return searchParam.some((attr) => {
            return (
              result[attr]
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            );
          });
        }
        return false;
      });

      // Sort the filtered results based on API
      let sortedFilteredResults = filteredResults.sort((resultA, resultB) => {
        return parseFloat(resultA.calculatedAPI).localeCompare(
          parseFloat(resultB.calculatedAPI)
        );
      });

      const uniqueIds = [];

      // Remove the slower timings of duplicate user ids
      let duplicatesRemoved = sortedFilteredResults.filter((result) => {
        if (!uniqueIds.includes(result.userId)) {
          uniqueIds.push(result.userId);
          return true;
        }
        return false;
      });

      return duplicatesRemoved;
    } else if (filterParam.eventFormat === "B") {
      // Filter based on gender and search
      let filteredResults = results.filter((result) => {
        // Check if gender of result is same and gender filter and if the result is verified
        if (result.gender === filterParam.gender && result.verified === true) {
          // Check for string typed into search bar
          return searchParam.some((attr) => {
            return (
              result[attr]
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            );
          });
        }
        return false;
      });

      // Create new hashmap that counts number of loops
      var countMap = new Map();

      // Iterate through filtered array to count number of results
      filteredResults.forEach((res) => {
        countMap.set(res.userId, countMap.get(res.userId) + 1 || 1);
      });

      // Remove duplicates from filtered array
      const uniqueIds = [];

      let duplicatesRemoved = filteredResults.filter((result) => {
        if (!uniqueIds.includes(result.userId)) {
          uniqueIds.push(result.userId);
          return true;
        }
        return false;
      });

      // Add count to each result in duplicatesRemoved
      // duplicatesRemoved.forEach((res) => {
      //   res["count"] = countMap.get(res.userId);
      // });
      var countedArray = duplicatesRemoved.map((item) => ({
        ...item,
        count: countMap.get(item.userId),
      }));

      return countedArray;
    }
    // when the time comes you will have to do this
    // else if (filterParam.eventFormat === "C") {}
    // first filter step code is repeated, if C also requires the same thing then abstract it to before the event format checking
  }

  const handleChange = (e) => {
    setFilterParam((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getResults());
    dispatch(getEvents());

    return () => {
      dispatch(resetResult());
    };
  }, [isError, message, dispatch]);

  let searchedResults = search(results);

  if (isLoading || !(events.length > 0)) {
    return <Runningman />;
  } else {
    return (
      <Stack spacing={8}>
        <Text textStyle="heading_s">Leaderboard</Text>

        <Grid w={"100%"} templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={1}>
            <Text fontWeight={700} fontSize={"sm"}>
              Event Format
            </Text>
            <Select onChange={handleChange} name="eventFormat">
              <option value={"A"}>Event A - Age Performance Index</option>
              <option value={"B"}>Event B - Most Number of 10.5km Loops</option>
              <option value={"C"}>
                Event C - Seoul Garden -MR25 Ultramarathon
              </option>
            </Select>
          </GridItem>
          <GridItem colSpan={1}>
            <Text fontWeight={700} fontSize={"sm"}>
              Gender
            </Text>
            <Select name="gender" onChange={handleChange}>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </Select>
          </GridItem>
        </Grid>

        <Alert
          status="info"
          borderRadius={"lg"}
          borderColor={"accents.blue"}
          borderWidth={"thin"}
        >
          <AlertIcon color={"accents.blue"} />
          {filterParam.eventFormat === "A"
            ? "The Age Performance Index is an indication of how close the participant is to the extrapolated age standard (100 being equal; >100 - exceeding the age standard) calculated based on the MR25 All-Inclusive 10.5km Trail Performance Index, a performance grading system that factors the runner’s age and gender. Please refer to the Table of Extrapolated Age Standards below"
            : filterParam.eventFormat === "B"
            ? "At the end of the qualifying period, on 19 Dec, the top 30 male and 30 female with the highest number of loops during the qualifying period will be invited to participate in the finals on 31 Dec."
            : "Check back on 31 Dec 2022 for live results of the finals!"}
        </Alert>

        <InputGroup>
          <Input
            placeholder={"Search athlete or institution"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputRightElement children={<SearchIcon />} />
        </InputGroup>

        <VStack align="stretch">
          {searchedResults.length == 0 ? (
            <HStack justifyContent={"center"}>
              <MdSearchOff size={"5em"} />
              <Text fontSize={"md"} fontWeight={700}>
                No results have been uploaded in this category yet
              </Text>
            </HStack>
          ) : (
            searchedResults.map((result, index) => (
              <ResultItem result={result} user={user} index={index} />
            ))
          )}
        </VStack>
        <HStack>
          <MdVerified />
          <Text fontSize={"sm"} fontWeight={400}>
            Result verified
          </Text>
        </HStack>
      </Stack>
    );
  }
}

export default Leaderboard;
