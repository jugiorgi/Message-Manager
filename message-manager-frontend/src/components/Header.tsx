import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Text, Link } from "@chakra-ui/react";

export function Header() {
  const [name, setName] = useState("");
  const route = useRouter();

  useEffect(() => {
    const appName = localStorage.getItem("appName");
    if (name !== null || name !== undefined) {
      setName(appName);
    }
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6"
    >
      <Link
        display="flex"
        _hover={{ textDecoration: "none" }}
        alignItems="flex-end"
        onClick={() => {
          route.push("/");
        }}
      >
        <Text
          fontSize="3xl"
          fontWeight="bold"
          letterSpacing="tight"
          w="64"
          cursor="pointer"
        >
          Message Manager
        </Text>
        {!!name && (
          <Text
            fontSize="md"
            fontWeight="bold"
            letterSpacing="tight"
            w="64"
            color="yellow.500"
          >
            {name}
          </Text>
        )}
      </Link>
    </Flex>
  );
}
