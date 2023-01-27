import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { format } from "date-fns";
import pt from "date-fns/locale/pt-BR";
import ReactHtmlParser from "html-react-parser";

interface HistoricTableProps {
  historic: {
    channel: string;
    content: string;
    createdAt: Date;
    id: string;
    origin: string;
  }[];
}

export function HistoricTable({ historic }: HistoricTableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [historicDetail, setHistoricDetail] = useState({
    channel: "",
    content: "",
    createdAt: new Date(),
    id: "",
    origin: "",
  });

  function handleInfo(historic) {
    onOpen();
    setHistoricDetail(historic);
  }

  return (
    <>
      <Table colorScheme="whiteAlpha" my="6">
        <Thead>
          <Tr>
            <Th>Data</Th>
            <Th>Canal</Th>
            <Th>Origem</Th>
          </Tr>
        </Thead>
        <Tbody>
          {historic.map((historicItem, index) => (
            <Tr key={index} onClick={() => handleInfo(historicItem)}>
              <Td>
                <Box>
                  <Text fontSize="small" color="gray.300">
                    {format(new Date(historicItem.createdAt), "d'/'MM'/'yyyy", {
                      locale: pt,
                    })}
                  </Text>
                </Box>
              </Td>
              <Td>
                <Box>
                  <Text fontSize="small" color="gray.300">
                    {historicItem.channel}
                  </Text>
                </Box>
              </Td>
              <Td>
                <Box>
                  <Text fontSize="small" color="gray.300">
                    {historicItem.origin}
                  </Text>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="gray.800">Detalhe da Notificação</ModalHeader>
          <ModalCloseButton bg="yellow.500" color="gray.800" />
          <ModalBody>
            <Text color="gray.800">
              <strong>Id: </strong> {historicDetail.id} <br />
              <strong>Data de Envio: </strong>{" "}
              {format(new Date(historicDetail.createdAt), "d'/'MM'/'yyyy HH:mm", {
                locale: pt,
              })}{" "}
              <br />
              <strong>Canal: </strong> {historicDetail.channel} <br />
              <strong>Origem: </strong> {historicDetail.origin} <br />
              <strong>Mensagem: </strong> <br /><br />
              <Box>{ReactHtmlParser(historicDetail.content)}</Box>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
