import { useEffect } from "react";
import { Icon, ButtonProps } from "@chakra-ui/react";
import {
  Paginator,
  Container,
  Previous,
  Next,
  PageGroup,
  usePaginator,
} from "chakra-paginator";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PaginationProps {
  pagesQuantity: number;
  onChange: Function;
}

export function Pagination({ pagesQuantity, onChange }: PaginationProps) {
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });

  useEffect(() => {
    onChange(currentPage);
  }, [currentPage]);

  const normalStyles: ButtonProps = {
    w: 7,
    fontSize: "sm",
    _hover: {
      color: "yellow.900",
    },
    bg: "transparent",
  };

  const activeStyles: ButtonProps = {
    w: 7,
    fontSize: "sm",
    bg: "transparent",
    color: "yellow.500",
    _focus: {
      outline: "outline: 0px auto -webkit-focus-ring-color",
      boxShadow: "none",
      bg: "transparent",
    },
  };

  return (
    <Paginator
      pagesQuantity={pagesQuantity}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      normalStyles={normalStyles}
      activeStyles={activeStyles}
      innerLimit={1}
      outerLimit={1}
    >
      <Container align="center" justify="space-between" p={3}>
        <Previous
          _hover={{
            background: "transparent",
          }}
          bg="transparent"
          color="yellow.700"
          _focus={{
            outline: "outline: 0px auto -webkit-focus-ring-color",
          }}
        >
          <Icon as={MdKeyboardArrowLeft} fontSize={50} />
        </Previous>
        <PageGroup color="yellow.700" background="transparent" />
        <Next
          _hover={{
            background: "transparent",
          }}
          bg="transparent"
          color="yellow.700"
          _focus={{
            outline: "outline: 0px auto -webkit-focus-ring-color",
          }}
        >
          <Icon as={MdKeyboardArrowRight} fontSize={50} />
        </Next>
      </Container>
    </Paginator>
  );
}
