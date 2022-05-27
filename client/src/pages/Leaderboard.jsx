import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getResults, reset } from "../features/results/resultSlice";
import { getEvents } from "../features/event/eventSlice";
import ResultItem from "../components/ResultItem";
import ResultTeamItem from "../components/ResultTeamItem";
import {
  Stack,
  Select,
  Grid,
  Text,
  GridItem,
  Alert,
  AlertIcon,
  InputGroup,
  Input,
  InputRightElement
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function Leaderboard() {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.events);

  const { user } = useSelector((state) => state.auth);

  const { results, isLoading, isError, message } = useSelector(
    (state) => state.results
  );

  const [searchParam] = useState(["institution", "firstName", "lastName"]);
  const [query, setQuery] = useState("");
  const [filterParam, setFilterParam] = useState({
    category: "Men's Under 15 (individual and team event)",
    eventType: "Individual"
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
    // Check individual or team
    if (filterParam.eventType === "Individual") {
      // Filtered based on category and search
      let filteredResults = results.filter((result) => {
        if (result.ageCategory === filterParam.category) {
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

      // Sort the filtered results based on time
      let sortedFilteredResults = filteredResults.sort((resultA, resultB) => {
        return resultA.runTiming.localeCompare(resultB.runTiming);
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
    } else {
      // Grouping the results by institution
      let groupedResults = results.reduce(function (r, a) {
        r[a.institution] = r[a.institution] || [];
        r[a.institution].push(a);
        return r;
      }, Object.create(null));

      const finalEntries = [];

      // Iterate through each institutions array of results
      for (let [inst, resultsArr] of Object.entries(groupedResults)) {
        // Filter verified and category
        let verifiedResArr = resultsArr.filter((res) => {
          if (res.ageCategory === filterParam.category) {
            return res.verified;
          }
          return false;
        });

        // Sort the results based on runTiming
        let sortedResArr = verifiedResArr.sort((resultA, resultB) => {
          return resultA.runTiming.localeCompare(resultB.runTiming);
        });

        const uniqueIds = [];

        // Remove the slower timings of duplicate user ids and take top 4 if there are more than 4 entries left
        let duplicatesRemoved = sortedResArr
          .filter((result) => {
            if (!uniqueIds.includes(result.userId)) {
              uniqueIds.push(result.userId);
              return true;
            }
            return false;
          })
          .slice(0, 4);

        // Find the sum of the top 4 runTimings
        let totalRunTiming = sumTime(duplicatesRemoved);

        // Check if there are 4 runTimings, if less than 4, institution not qualified for team event
        if (duplicatesRemoved.length === 4) {
          finalEntries.push([inst, duplicatesRemoved, totalRunTiming]);
        }
      }
      return finalEntries;
    }
  }

  const withTeams = ["Individual", "Team"];
  const woTeams = ["Individual"];
  let indivOrTeamsOption =
    filterParam.category === "Men's Open (individual event only)" ||
    filterParam.category === "Men's Above 50 (individual event only)" ||
    filterParam.category === "Women's Open (individual event only)" ||
    filterParam.category === "Women's Above 50 (individual event only)"
      ? woTeams
      : withTeams;

  const handleChange = (e) => {
    setFilterParam((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getResults());
    dispatch(getEvents());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading || !(events.length > 0)) {
    return <Text>is loading</Text>;
  } else {
    return (
      <Stack spacing={8}>
        <Text fontWeight={700} fontSize={"2xl"}>
          Leaderboard
        </Text>

        <Grid w={"100%"} templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={1}>
            <Text fontWeight={700} fontSize={"sm"}>
              Category
            </Text>
            <Select onChange={handleChange} name="category">
              {events[0].eventDetails.ageCategories.map((ageCat) =>
                filterParam.eventType === "Team" &&
                (ageCat === "Men's Open (individual event only)" ||
                  ageCat === "Men's Above 50 (individual event only)" ||
                  ageCat === "Women's Open (individual event only)" ||
                  ageCat ===
                    "Women's Above 50 (individual event only)") ? null : (
                  <option value={ageCat} key={ageCat}>
                    {ageCat}
                  </option>
                )
              )}
            </Select>
          </GridItem>
          <GridItem colSpan={1}>
            <Text fontWeight={700} fontSize={"sm"}>
              Individual or Team
            </Text>
            <Select name="eventType" onChange={handleChange}>
              {indivOrTeamsOption.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
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
          {filterParam.eventType === "Individual"
            ? "The top 8 runners from each age-gender category will be invited to the Grand Finale where the winner from each age-gender category will be declared Champion of Champions and awarded a trophy"
            : "A team’s score is the sum of the timings of the 4 fastest athletes of each institution indicated in the registration. Winner medals will be given to the  athletes of the top-3 teams in each category."}
        </Alert>

        <InputGroup>
          <Input
            placeholder={"Search athlete"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputRightElement children={<SearchIcon />} />
        </InputGroup>

        {filterParam.eventType === "Individual"
          ? search(results).map((result, index) => (
              <ResultItem result={result} user={user} index={index} />
            ))
          : search(results).map((entry, idx) => (
              <ResultTeamItem entry={entry} idx={idx} user={user} />
            ))}
      </Stack>
    );
  }
}

export default Leaderboard;
