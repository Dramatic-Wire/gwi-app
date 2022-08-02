import { VStack, Spinner, Heading, Box } from "native-base";

export default function () {

  return (
    <Box safeArea bg='primary.800' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <VStack space={3} safeArea='8' justifyContent='center'>
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </VStack>
    </Box>
  );
}