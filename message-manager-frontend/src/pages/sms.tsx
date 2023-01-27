import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function Sms() {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Flex flex="1" borderRadius="8" bg="gray.800" p="8" alignItems="center" direction="column">
          <Heading size="md" fontWeight="normal" margin="auto">
            SMS em desenvolvimento
          </Heading>

          <Spinner color="yellow.600" mb="10%"/>
        </Flex>
      </Flex>
    </Box>
  );
}
