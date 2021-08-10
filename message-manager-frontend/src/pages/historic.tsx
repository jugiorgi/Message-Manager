import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Icon,
  Button,
  Select,
} from "@chakra-ui/react";
import api from "../services/api";
import { Sidebar } from "../components/Sidebar";
import { Pagination } from "../components/Pagination";
import { Header } from "../components/Header";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { MdDateRange, MdSearch } from "react-icons/md";
import { CsvExport } from "../components/CsvExport";
import { PdfExport } from "../components/PdfExport";
import { HistoricTable } from "../components/HistoricTable";

type HistoricFormData = {
  initialDate: string;
  finalDate: string;
  channel: string;
  origin: string;
};

export default function Historic() {
  const { register, handleSubmit, formState } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);

  const [historic, setHistoric] = useState([
    { channel: "", content: "", createdAt: new Date(), id: "", origin: "" },
  ]);

  const [filter, setFilter] = useState({
    initialDate: "",
    finalDate: "",
    channel: "",
    origin: "",
  });

  const toast = useToast();

  useEffect(() => {
    api
      .post(`notifications/historic?page=${currentPage - 1}`, {
        initialDate: filter.initialDate,
        finalDate: filter.finalDate,
        channel: filter.channel,
        origin: filter.origin,
      })
      .then((result) => {
        setHistoric(result.data.content);
        setPagesQuantity(result.data.totalPages);
      })
      .catch(() => {
        toast({
          title: "Erro ao buscar o histórico",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      });
  }, [currentPage, filter]);

  const handleConfiguration: SubmitHandler<HistoricFormData> = async (
    values
  ) => {
    setFilter({
      initialDate: values.initialDate,
      finalDate: values.finalDate,
      channel: values.channel,
      origin: values.origin,
    });
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p="8"
          as="form"
          onSubmit={handleSubmit(handleConfiguration)}
        >
          <Flex mb="8" justify="space-between" alignItems="center" as="a">
            <Heading size="md" fontWeight="normal">
              Histórico
            </Heading>
          </Flex>
          <Flex justify="space-between" alignItems="center">
            <Flex
              as="label"
              px="4"
              mx="1"
              h="10"
              alignItems="center"
              color="gray.400"
              bg="gray.900"
              borderRadius="5"
            >
              <Input
                name="initialDate"
                color="gray.400"
                variant="unstyled"
                placeholder="Data Inicial"
                type="date"
                _placeholder={{ color: "gray.400" }}
                css={{
                  "::-webkit-calendar-picker-indicator": {
                    display: "none",
                  },
                }}
                {...register("initialDate")}
              />

              <Icon as={MdDateRange} fontSize={18} />
            </Flex>
            <Flex
              as="label"
              px="4"
              mx="1"
              h="10"
              alignItems="center"
              color="gray.400"
              bg="gray.900"
              borderRadius="5"
            >
              <Input
                name="finalDate"
                color="gray.400"
                variant="unstyled"
                placeholder="Data Final"
                type="date"
                _placeholder={{ color: "gray.400" }}
                css={{
                  "::-webkit-calendar-picker-indicator": {
                    display: "none",
                  },
                }}
                {...register("finalDate")}
              />

              <Icon as={MdDateRange} fontSize={18} />
            </Flex>
            <Flex
              as="label"
              px="4"
              mx="1"
              h="10"
              alignItems="center"
              color="gray.400"
              bg="gray.900"
              borderRadius="5"
            >
              <Select
                color="gray.400"
                colorScheme="gray.400"
                variant="unstyled"
                placeholder="Canal"
                name="channel"
                _placeholder={{ color: "gray.400" }}
                {...register("channel")}
              >
                <option value="email">E-mail</option>
                <option value="push">Web Push</option>
                <option value="sms">SMS</option>
              </Select>
            </Flex>
            <Flex
              as="label"
              px="4"
              mx="1"
              h="10"
              alignItems="center"
              color="gray.400"
              bg="gray.900"
              borderRadius="5"
            >
              <Select
                color="gray.400"
                variant="unstyled"
                placeholder="Origem"
                name="origin"
                _placeholder={{ color: "gray.400" }}
                {...register("origin")}
              >
                <option value="platform">Plataforma</option>
                <option value="api">API</option>
              </Select>
            </Flex>

            <Button
              bg="yellow.500"
              color="gray.800"
              type="submit"
              alignSelf="center"
              isLoading={formState.isSubmitting}
              _hover={{ textDecoration: "none", background: "yellow.600" }}
              rightIcon={<Icon as={MdSearch} fontSize={18} />}
            >
              Buscar
            </Button>
          </Flex>
          <HistoricTable historic={historic} />
          <Pagination
            pagesQuantity={pagesQuantity}
            onChange={(page) => setCurrentPage(page)}
          />
          <Flex mt="8" justify="flex-end">
            <Button
              bg="yellow.500"
              color="gray.800"
              alignSelf="center"
              size="sm"
              marginRight="10px"
              _hover={{ textDecoration: "none", background: "yellow.600" }}
            >
              <CsvExport historic={historic} />
            </Button>
            <PdfExport historic={historic} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
