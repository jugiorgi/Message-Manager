import { useState, useEffect } from "react";
import { Box, Stack, Text, Link, Icon } from "@chakra-ui/react";
import {
  MdSms,
  MdEmail,
  MdNotifications,
  MdViewHeadline,
  MdChatBubble,
} from "react-icons/md";
import { useRouter } from "next/router";

export function Sidebar() {
  const route = useRouter();
  const [isNotification, setIsNotification] = useState(
    route.pathname === "/notification"
  );
  const [isHistoric, setIsHistoric] = useState(route.pathname === "/historic");
  const [isPush, setIsPush] = useState(route.pathname === "/push");
  const [isEmail, setIsEmail] = useState(route.pathname === "/email");
  const [isSms, setIsSms] = useState(route.pathname === "/sms");

  return (
    <Box as="aside" w="65" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Stack spacing="4" mt="8" align="stretch">
            <Text fontWeight="bold" color="gray.400" fontSize="small">
              GERAL
            </Text>
            <Link
              bg={isNotification ? "rgba(214,158,46,0.2)" : ""}
              borderRight={
                isNotification ? "2px solid rgba(214,158,46,0.4)" : ""
              }
              display="flex"
              alignItems="center"
              _hover={{ textDecoration: "none", color: "gray.300" }}
              onClick={() => {
                route.push("/notification");
              }}
            >
              <Icon as={MdNotifications} fontSize={18} />
              <Text mx="4" fontWeight="medium">
                Envio Manual de Notificações{" "}
              </Text>
            </Link>
            <Link
              bg={isHistoric ? "rgba(214,158,46,0.2)" : ""}
              borderRight={isHistoric ? "2px solid rgba(214,158,46,0.4)" : ""}
              display="flex"
              alignItems="center"
              _hover={{ textDecoration: "none", color: "gray.300" }}
              onClick={() => {
                route.push("/historic");
              }}
            >
              <Icon as={MdViewHeadline} fontSize={18} />
              <Text mx="4" fontWeight="medium">
                Histórico de Notificações{" "}
              </Text>
            </Link>
          </Stack>
          <Stack spacing="4" mt="40%" align="stretch">
            <Text fontWeight="bold" color="gray.400" fontSize="small">
              CONFIGURAÇÕES
            </Text>
            <Link
              bg={isPush ? "rgba(214,158,46,0.2)" : ""}
              borderRight={isPush ? "2px solid rgba(214,158,46,0.4)" : ""}
              display="flex"
              alignItems="center"
              _hover={{ textDecoration: "none", color: "gray.300" }}
              onClick={() => route.push("/push")}
            >
              <Icon as={MdChatBubble} fontSize={18} />
              <Text mx="4" fontWeight="medium">
                Web Push{" "}
              </Text>
            </Link>
            <Link
              bg={isEmail ? "rgba(214,158,46,0.2)" : ""}
              borderRight={isEmail ? "2px solid rgba(214,158,46,0.4)" : ""}
              display="flex"
              alignItems="center"
              _hover={{ textDecoration: "none", color: "gray.300" }}
              onClick={() => route.push("/email")}
            >
              <Icon as={MdEmail} fontSize={18} />
              <Text mx="4" fontWeight="medium">
                E-mail{" "}
              </Text>
            </Link>
            <Link
              bg={isSms ? "rgba(214,158,46,0.2)" : ""}
              borderRight={isSms ? "2px solid rgba(214,158,46,0.4)" : ""}
              display="flex"
              alignItems="center"
              _hover={{ textDecoration: "none", color: "gray.300" }}
              onClick={() => route.push("/sms")}
            >
              <Icon as={MdSms} fontSize={18} />
              <Text mx="4" fontWeight="medium">
                SMS{" "}
              </Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
