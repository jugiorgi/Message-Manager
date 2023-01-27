import {
  Flex,
  Box,
  Heading,
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

type ConfigurationFormData = {
  name: string;
  push: string;
  email: string;
  sms: string;
};

export default function Dashboard() {
  const toast = useToast();

  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  const handleConfiguration: SubmitHandler<ConfigurationFormData> = async (
    values
  ) => {
    toast({
      title: "Configuração criada com sucesso!",
      status: "success",
      isClosable: true,
      position: "top-right",
    });
    localStorage.setItem("appName", values.name);
  };

  return (
    <Flex direction="column" h="100vh">
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
              Configuração do Aplicativo
            </Heading>
          </Flex>
          <Flex justify="space-between" alignItems="center">
            <Input
              error={errors.name}
              name="name"
              label="Nome"
              {...register("name")}
            />
          </Flex>
          <Flex mt="10" alignItems="center">
            <CheckboxGroup colorScheme="yellow">
              <HStack>
                <Checkbox
                  isDisabled
                  value="push"
                  name="push"
                  {...register("push")}
                >
                  Web Push
                </Checkbox>
                <Checkbox value="email" name="email" {...register("email")}>
                  E-mail
                </Checkbox>
                <Checkbox
                  isDisabled
                  value="sms"
                  name="sms"
                  {...register("sms")}
                >
                  SMS
                </Checkbox>
              </HStack>
            </CheckboxGroup>
          </Flex>
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
    </Flex>
  );
}
