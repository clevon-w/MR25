import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getResults, resetResult } from "../features/results/resultSlice";
import { getEvents } from "../features/event/eventSlice";
import ResultItem from "../components/ResultItem";
import ResultTeamItem from "../components/ResultTeamItem";
import ResultLoopItem from "../components/ResultLoopItem";
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
import {
  maleMemberArr,
  maleGuestArr,
  femaleMemberArr,
  femaleGuestArr,
} from "../utils/eventCResults";

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
    eventFormat: "C",
    genderMember: "Male_yes",
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
    // split into gender and member status
    var gender = filterParam.genderMember.split("_")[0],
      member = filterParam.genderMember.split("_")[1];
    if (filterParam.eventFormat === "A") {
      var cutoff = new Date("December 26, 2022 23:00:00 GMT+00:00"); // 7am SGT in UTC (1 day behind)

      // Filter based on gender and search
      let filteredResults = results.filter((result) => {
        var created = new Date(result.createdAt);

        // Check if gender and member status of result is same as filter
        if (
          result.gender === gender &&
          result.member === member &&
          !result.rejected &&
          created.getTime() < cutoff.getTime() // results created before finals only, not counting the finals in the previous events
        ) {
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
        return (
          parseFloat(resultB.calculatedAPI) - parseFloat(resultA.calculatedAPI)
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
      var cutoff = new Date("December 26, 2022 23:00:00 GMT+00:00"); // 7am SGT in UTC (1 day behind)

      // Filter based on gender and search
      let filteredResults = results.filter((result) => {
        var created = new Date(result.createdAt);

        // Check if gender of result is same and gender filter and if the result is verified
        if (
          result.gender === gender &&
          result.member === member &&
          !result.rejected &&
          created.getTime() < cutoff.getTime() // results created before finals only, not counting the finals in the previous events
        ) {
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

      let accumulateFiltered = {};

      for (let idx in filteredResults) {
        let currRes = filteredResults[idx];
        if (currRes.userId in accumulateFiltered) {
          // take the value of the dictionary
          let currValue = accumulateFiltered[currRes.userId];

          // create a copy of the currValue that is inside accumulateFiltered
          let currCopy = { ...currValue };

          // add the loops
          currCopy.loops += currRes.loops;

          // and verified status
          currCopy.loopsVerified &= currRes.loopsVerified;

          // compare dates and keep the latest date
          if (currCopy.runDate < currRes.runDate) {
            currCopy.runDate = currRes.runDate;
          }

          // reassign it back into accumulateFiltered
          accumulateFiltered[currRes.userId] = currCopy;
        } else {
          // create new key value pair
          accumulateFiltered[currRes.userId] = currRes;
        }
      }

      let arrayOfAccumulatedLoops = Object.values(accumulateFiltered);

      // Sort the filtered results based on number of loop
      let sortedFilteredResults = arrayOfAccumulatedLoops.sort(
        (resultA, resultB) => {
          const loopdiff =
            parseFloat(resultB.loops) - parseFloat(resultA.loops);
          const agediff = resultB.age - resultA.age;
          return loopdiff == 0 ? agediff : loopdiff;
        }
      );

      return sortedFilteredResults;
    } else if (filterParam.eventFormat === "C") {
      // var start = new Date("December 30, 2022 23:00:00 GMT+00:00"); // 7am SGT in UTC (1 day behind)
      // var end = new Date("December 31, 2022 12:00:00 GMT+00:00"); // 8pm SGT in UTC

      // // Filter based on gender and search
      // let filteredResults = results.filter((result) => {
      //   var created = new Date(result.createdAt);
      //   // result.createdAt.split("T")[1].split(".")[0]
      //   // Check if gender of result is same and gender filter and if the result is verified
      //   if (
      //     result.gender === gender && // check gender
      //     result.member === member && // check membership status
      //     !result.rejected && // check if result is rejected
      //     result.runDateString == "Sat Dec 31 2022" && // check if the result was uploaded on the correct date (31 dec)
      //     created.getTime() >= start.getTime() && // check if the result was uploaded in the correct timeframe (7am to 7pm)
      //     created.getTime() <= end.getTime()
      //   ) {
      //     // Check for string typed into search bar
      //     return searchParam.some((attr) => {
      //       return (
      //         result[attr]
      //           .toString()
      //           .toLowerCase()
      //           .indexOf(query.toLowerCase()) > -1
      //       );
      //     });
      //   }
      //   return false;
      // });

      // let accumulateFiltered = {};

      // for (let idx in filteredResults) {
      //   let currRes = filteredResults[idx];
      //   if (currRes.userId in accumulateFiltered) {
      //     // take the value of the dictionary
      //     let currValue = accumulateFiltered[currRes.userId];

      //     // create a copy of the currValue that is inside accumulateFiltered
      //     let currCopy = { ...currValue };

      //     // add the loops
      //     currCopy.loops += currRes.loops;

      //     // and verified status
      //     currCopy.loopsVerified &= currRes.loopsVerified;

      //     // compare dates and keep the latest date
      //     if (currCopy.runDate < currRes.runDate) {
      //       currCopy.runDate = currRes.runDate;
      //     }

      //     // reassign it back into accumulateFiltered
      //     accumulateFiltered[currRes.userId] = currCopy;
      //   } else {
      //     // create new key value pair
      //     accumulateFiltered[currRes.userId] = currRes;
      //   }
      // }

      // let arrayOfAccumulatedLoops = Object.values(accumulateFiltered);

      // // Sort the filtered results based on number of loop
      // let sortedFilteredResults = arrayOfAccumulatedLoops.sort(
      //   (resultA, resultB) => {
      //     const loopdiff =
      //       parseFloat(resultB.loops) - parseFloat(resultA.loops);
      //     const agediff = resultB.age - resultA.age;
      //     return loopdiff == 0 ? agediff : loopdiff;
      //   }
      // );
      // console.log(sortedFilteredResults);
      // return sortedFilteredResults;

      if (gender == "Male" && member == "yes") {
        return maleMemberArr;
      } else if (gender == "Male" && member == "no") {
        return maleGuestArr;
      } else if (gender == "Female" && member == "yes") {
        return femaleMemberArr;
      } else if (gender == "Female" && member == "no") {
        return femaleGuestArr;
      } else {
        return [];
      }
    }
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
  console.log(events.length);

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
              <option value={"C"} selected={"selected"}>
                Event C - Seoul Garden-MR25 Ultramarathon
              </option>
            </Select>
          </GridItem>
          <GridItem colSpan={1}>
            <Text fontWeight={700} fontSize={"sm"}>
              Gender
            </Text>
            <Select name="genderMember" onChange={handleChange}>
              <option value={"Male_yes"}>Male (Member)</option>
              <option value={"Female_yes"}>Female (Member)</option>
              <option value={"Male_no"}>Male (Guest)</option>
              <option value={"Female_no"}>Female (Guest)</option>
            </Select>
          </GridItem>
        </Grid>

        {filterParam.eventFormat === "A" || filterParam.eventFormat == "C" ? (
          <Alert
            status="info"
            borderRadius={"lg"}
            borderColor={"accents.blue"}
            borderWidth={"thin"}
          >
            <AlertIcon color={"accents.blue"} />
            {filterParam.eventFormat === "A"
              ? "The Age Performance Index is an indication of how close the participant is to the extrapolated age standard (100 being equal; >100 - exceeding the age standard) calculated based on the MR25 All-Inclusive 10.5km Trail Performance Index, a performance grading system that factors the runner’s age and gender."
              : "All results ratified."}
          </Alert>
        ) : null}

        <InputGroup>
          <Input
            placeholder={"Search athlete"}
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
          ) : filterParam.eventFormat === "A" ? (
            searchedResults.map((result, index) => (
              <ResultItem result={result} user={user} index={index} />
            ))
          ) : (
            searchedResults.map((result, index) => (
              <ResultLoopItem result={result} user={user} index={index} />
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
