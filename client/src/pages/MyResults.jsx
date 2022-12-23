/**
 * The dashboard, aka the main page, aka the home page,
 * is also the page where the user will learn about the events
 * since there is only one event, it will be the About MR25 page
 */
import React, { useEffect, useState, PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getResults, resetResult } from "../features/results/resultSlice";
import { getEvents } from "../features/event/eventSlice";
import MyResultItem from "../components/MyResultItem";
import {
  Stack,
  VStack,
  Text,
  HStack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import { SearchIcon } from "@chakra-ui/icons";
import { MdSearchOff, MdVerified } from "react-icons/md";
import Runningman from "../components/Runningman";
import { formatDateDDMonYYYY } from "../utils/helperFunctions";

function MyResults() {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.events);

  const { user } = useSelector((state) => state.auth);

  const { results, isLoading, isError, message } = useSelector(
    (state) => state.results
  );

  function search(results) {
    // Find current user id
    var currId = user.data._id;

    // Filter based on user id
    let filteredResults = results.filter((result) => {
      return result.userId == currId;
    });

    return filteredResults;
  }

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

  let data = [];
  for (let i = 0; i < searchedResults.length; i++) {
    data[i] = { ...searchedResults[i] };
    data[i]["runDate"] = formatDateDDMonYYYY(data[i]["runDate"]);
    data[i]["calculatedAPI"] = parseFloat(data[i]["calculatedAPI"]);
  }

  if (isLoading || !(events.length > 0)) {
    return <Runningman />;
  } else {
    return (
      <Stack spacing={8}>
        <Text textStyle="heading_s">My Results</Text>
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList>
            <Tab>List View</Tab>
            <Tab>Graph View</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <VStack align="stretch">
                {searchedResults.length == 0 ? (
                  <HStack justifyContent={"center"}>
                    <MdSearchOff size={"5em"} />
                    <Text fontSize={"md"} fontWeight={700}>
                      You have not uploaded any results!
                    </Text>
                  </HStack>
                ) : (
                  searchedResults.map((result, index) => (
                    <MyResultItem result={result} user={user} index={index} />
                  ))
                )}
              </VStack>
              <HStack>
                <MdVerified />
                <Text fontSize={"sm"} fontWeight={400}>
                  Result verified
                </Text>
              </HStack>
            </TabPanel>
            <TabPanel px={0}>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                API graph
              </Text>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  width="100%"
                  height={300}
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="runDate" padding={{ left: 30, right: 30 }} />
                  <YAxis dataKey="calculatedAPI" name="API" unit="%" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="calculatedAPI"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="API"
                    unit="%"
                  />
                </LineChart>
              </ResponsiveContainer>
              <Text fontWeight={700} fontSize={"md"} color={"primary.800"}>
                Loops Graph
              </Text>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  width="100%"
                  height={300}
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="runDate" padding={{ left: 30, right: 30 }} />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="loops"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    );
  }
}
export default MyResults;
