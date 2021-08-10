import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
  Divider,
  Button,
  Stack,
} from "@chakra-ui/react";
import ReactHtmlParser from "html-react-parser";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../services/api";
import { useToast } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Input } from "../components/Form/Input";

export default function Notification() {
  const [chosen, setChosen] = useState<string>(null);
  const [push, setPush] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const [sms, setSms] = useState<boolean>(false);
  const [emailItems, setEmailItems] = useState<Array<number>>([0]);
  const [templates, setTemplates] = useState<Array<any>>([]);
  const [template, setTemplate] = useState<number>();

  const toast = useToast();

  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  useEffect(() => {
    var emailId = localStorage.getItem("emailConfiguration");
    var emailPush = localStorage.getItem("pushConfiguration");
    var smsId = localStorage.getItem("smsConfiguration");
    if (emailId !== null) {
      setEmail(true);
      api
        .get(`templates/${emailId}`)
        .then((result) => {
          setTemplates(result.data);
        })
        .catch(() => {
          toast({
            title: "Erro ao carregar os templates",
            status: "error",
            isClosable: true,
            position: "top-right",
          });
        });
    }
    if (emailPush !== null) {
      setPush(true);
    }
    if (smsId !== null) {
      setSms(true);
    }
  }, []);

  const handleConfiguration: SubmitHandler<any> = async (values) => {
    var emails = [];
    Object.keys(values).forEach(function (item) {
      emails.push(values[item]);
    });

    if (emails.length != 0 && template !== null) {
      await api
        .post("notifications/email", {
          emails,
          templateId: template,
          origin: "PLATFORM",
        })
        .then((result) => {
          toast({
            title: "Notificação enviada com sucesso!",
            status: "success",
            isClosable: true,
            position: "top-right",
          });
        })
        .catch(() => {
          toast({
            title: "Erro ao enviar a notificação",
            status: "error",
            isClosable: true,
            position: "top-right",
          });
        });
    } else {
      toast({
        title: "Necessário cadastrar ao menos um e-mail e um template",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  function addNewEmailItem() {
    setEmailItems([...emailItems, emailItems.length]);
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" alignItems="center" as="a">
            <Heading size="md" fontWeight="normal">
              Envio de Notificação
            </Heading>
          </Flex>
          <Flex justify="space-between" alignItems="center">
            <Button
              as="a"
              px="4"
              mx="1"
              h="10"
              w="33%"
              alignSelf="center"
              fontSize="sm"
              bg="yellow.500"
              color="gray.800"
              onClick={() => (push ? setChosen("push") : "")}
              _hover={{ textDecoration: "none", background: "yellow.600" }}
              disabled={!push}
            >
              Web Push
            </Button>

            <Button
              as="a"
              px="4"
              mx="1"
              h="10"
              w="33%"
              alignSelf="center"
              fontSize="sm"
              bg="yellow.500"
              color="gray.800"
              onClick={() => (email ? setChosen("email") : "")}
              _hover={{ textDecoration: "none", background: "yellow.600" }}
              disabled={!email}
            >
              E-mail
            </Button>

            <Button
              as="a"
              px="4"
              mx="1"
              h="10"
              w="33%"
              alignSelf="center"
              fontSize="sm"
              bg="yellow.500"
              color="gray.800"
              onClick={() => (sms ? setChosen("sms") : "")}
              _hover={{ textDecoration: "none", background: "yellow.600" }}
              disabled={!sms}
            >
              SMS
            </Button>
          </Flex>
          {chosen === "email" && (
            <Box
              as="form"
              borderRadius="8"
              bg="gray.800"
              p="8"
              alignItems="center"
              onSubmit={handleSubmit(handleConfiguration)}
            >
              <VStack spacing="8" mt="70">
                <SimpleGrid
                  minChildWidth="240px"
                  spacing="8"
                  w="100%"
                  alignItems="center"
                >
                  {emailItems.map((emailItem, index) => {
                    return (
                      <Input
                        key={index}
                        name={`email-${emailItem}`}
                        label="E-mail"
                        error={errors.email}
                        type="email"
                        {...register(`email${emailItem}`)}
                      />
                    );
                  })}

                  <Button
                    bg="gray.800"
                    type="button"
                    onClick={addNewEmailItem}
                    _hover={{ bg: "transparent" }}
                  >
                    Adicionar novo e-mail
                  </Button>
                </SimpleGrid>

                <Divider my="6" borderColor="gray.700" />

                <SimpleGrid
                  minChildWidth="240px"
                  spacing="8"
                  w="100%"
                  alignItems="center"
                  space
                >
                  {templates.map((home) => {
                    return (
                      <Box
                        key={home.id}
                        border="2px"
                        borderColor={
                          template === home.id ? "yellow.700" : "transparent"
                        }
                        onClick={() => {
                          setTemplate(home.id);
                        }}
                      >
                        {ReactHtmlParser(home.template)}
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </VStack>

              <Flex mt="8" justify="flex-end">
                <Button
                  bg="yellow.500"
                  color="gray.800"
                  type="submit"
                  _hover={{ textDecoration: "none", background: "yellow.600" }}
                  isLoading={formState.isSubmitting}
                >
                  Enviar
                </Button>
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
