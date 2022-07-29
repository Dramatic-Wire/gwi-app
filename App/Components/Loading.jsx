import { HStack, Spinner, Heading, } from "native-base";

export default function () {
   
    return (
        <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </HStack>
    );
}