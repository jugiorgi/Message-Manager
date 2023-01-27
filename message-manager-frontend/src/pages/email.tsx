import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import api from "../services/api";
import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Input } from "../components/Form/Input";

type ConfigurationFormData = {
  serverName: string;
  port: string;
  login: string;
  password: string;
  senderName: string;
  senderEmail: string;
};

const configurationFormSchema = yup.object().shape({
  serverName: yup.string().required("Nome do Servidor obrigatório"),
  port: yup.string().required("Porta obrigatória").max(4),
  login: yup.string().required("Login obrigatório"),
  password: yup.string().required("Senha obrigatória"),
  senderName: yup.string().required("Nome do remetente obrigatório"),
  senderEmail: yup
    .string()
    .required("E-mail do remetente obrigatório")
    .email("E-mail inválido"),
});

export default function Email() {
  const [templateItems, setTemplateItems] = useState<Array<number>>([0]);
  const [templateFile, setTemplateFile] = useState([]);

  const toast = useToast();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(configurationFormSchema),
  });

  const { errors } = formState;

  const handleConfiguration: SubmitHandler<ConfigurationFormData> = async (
    values
  ) => {
    if (templateFile.length != 0) {
      await api
        .post("configuration/emails", {
          serverName: values.serverName,
          port: values.port,
          login: values.login,
          password: values.password,
          senderName: values.senderName,
          senderEmail: values.senderEmail,
          templates: templateFile,
        })
        .then((result) => {
          toast({
            title: "Configuração criada com sucesso!",
            status: "success",
            isClosable: true,
            position: "top-right",
          });
          localStorage.setItem("emailConfiguration", result.data.id);
        })
        .catch(() => {
          toast({
            title: "Erro ao criar configuração",
            status: "error",
            isClosable: true,
            position: "top-right",
          });
        });
    } else {
      toast({
        title: "Necessário cadastrar ao menos um template",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  async function handleSubmitTemplate(e) {
    const data = new FormData();
    data.append("template", e.target.files[0]);
    const response = await api.post("templates", data);
    const { id } = response.data;
    setTemplateFile([...templateFile, id]);
  }

  function addNewTemplateItem() {
    setTemplateItems([...templateItems, templateItems.length]);
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p="8"
          onSubmit={handleSubmit(handleConfiguration)}
        >
          <Flex mb="8" justify="space-between" alignItems="center" as="a">
            <Heading size="md" fontWeight="normal">
              Configuração de Envio de E-mail
            </Heading>
          </Flex>

          <VStack spacing="8" mt="70">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input
                name="serverName"
                label="Nome do Servidor SMTP"
                error={errors.serverName}
                {...register("serverName")}
              />
              <Input
                name="port"
                label="Porta de Envio"
                error={errors.port}
                maxLength={4}
                {...register("port")}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input
                name="login"
                label="Login"
                error={errors.login}
                {...register("login")}
              />
              <Input
                name="password"
                label="Senha"
                error={errors.password}
                type="password"
                {...register("password")}
              />
            </SimpleGrid>

            <Divider myy="6" borderColor="gray.700" />

            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input
                name="senderName"
                label="Nome do remetente"
                error={errors.senderName}
                {...register("senderName")}
              />
              <Input
                name="senderEmail"
                label="E-mail do remetente"
                error={errors.senderEmail}
                type="email"
                {...register("senderEmail")}
              />
            </SimpleGrid>

            <Divider my="6" borderColor="gray.700" />

            <SimpleGrid
              minChildWidth="240px"
              spacing="8"
              w="100%"
              alignItems="center"
            >
              {templateItems.map((templateItem, index) => {
                return (
                  <Input
                    key={index}
                    name={`template-${templateItem}`}
                    label="Template"
                    error={errors.template}
                    type="file"
                    accept="html/*"
                    onChange={(e) => handleSubmitTemplate(e)}
                    css={{
                      "::file-selector-button": {
                        display: "none",
                      },
                    }}
                    style={{
                      alignItems: "center",
                    }}
                  />
                );
              })}

              <Button
                bg="gray.800"
                type="button"
                onClick={addNewTemplateItem}
                _hover={{ bg: "transparent" }}
              >
                Adicionar novo template
              </Button>
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
      </Flex>
    </Box>
  );
}
