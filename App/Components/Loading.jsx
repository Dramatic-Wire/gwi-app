import { VStack, Spinner, Heading, Box } from "native-base";

export default function () {

  return (
    <Box safeArea bg='#5f9cda' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <VStack space={3} safeArea='8' justifyContent='center'>
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.700" fontSize="md">
            Loading
          </Heading>
        </VStack>
    </Box>
  );
}