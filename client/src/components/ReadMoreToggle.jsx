/**
 * This component is for large content that need to have a read more function.
 * It takes in a title and an array of content.
 * The zeroth element in the content array will be taken as the main content to be displayed.
 * The rest of the content will be displayed when the read more button is clicked.
 */

import { Button, VStack, Text, Stack, Collapse } from "@chakra-ui/react";
import { React, useState } from "react";

const ReadMoreToggle = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <VStack spacing={4} align={"flex-start"}>
      <Text fontWeight={700} fontSize={"md"}>
        {props.title}
      </Text>
      <VStack spacing={2} align={'flex-start'}>
        <Content contentArr={props.contentArr} isOpen={isOpen} />
        <Toggle toggle={toggle} isOpen={isOpen} />
      </VStack>
    </VStack>
  );
};

const Toggle = ({ toggle, isOpen }) => {
  return (
    <Stack w='100%' align={'flex-end'}>
      <Button
        variant={'link'}
        onClick={toggle}
        size={'xs'}
        color={'primary.800'}
        fontSize={'sm'}
        fontWeight={400}
      >
        Read
        {isOpen ? (
          ' less...'
        ) : (
          ' more...'
        )}
      </Button>
    </Stack>
  );
};

const Content = ({ contentArr, isOpen }) => {
  return (
    <>
      <Text fontWeight={400} fontSize={"sm"}>
        {contentArr[0]}
      </Text>
      <Collapse startingHeight={0} in={isOpen}>
        <VStack spacing={2} align={'flex-start'}>
          {contentArr.slice(1).map((para) => (
            <Text fontWeight={400} fontSize={"sm"}>
              {para}
            </Text>
          ))}
        </VStack>
      </Collapse>
    </>
  )
}

export default ReadMoreToggle;
