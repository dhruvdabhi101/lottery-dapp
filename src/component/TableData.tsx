"use client";
import {
  Box,
  TableContainer,
  Thead,
  Table,
  Th,
  Tr,
  Tbody,
  Image,
  Td,
} from "@chakra-ui/react";

type TableProps = {
  data: string[];
  extraData?: string[];
};
const TableData = (props: TableProps) => {
  return (
    <Box
      display={"flex"}
      alignSelf={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      width={["95%", "50"]}
    >
      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th>Address</Th>
              {props.extraData?.length ? <Th>Amount</Th> : null}
            </Tr>
          </Thead>
          <Tbody>
            {props.data &&
              props.data.map((player: string, index: number) => (
                <Tr
                  key={player}
                  display={"flex"}
                  gap={4}
                  alignItems={"center"}
                  _hover={{ background: "purple.500", color: "white" }}
                  padding={2}
                  paddingX={4}
                  rounded={"xl"}
                  borderWidth={1}
                  transition={"ease"}
                  transitionDuration={"200ms"}
                  margin={1}
                >
                  <Image
                    src="https://avatar.iran.liara.run/public/boy"
                    width={10}
                    height={10}
                    alt="profile"
                  />
                  <Td fontWeight={600}>{player}</Td>
                  {props.extraData?.length ? (
                    <Td fontWeight={600}>{props.extraData[index]}</Td>
                  ) : null}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableData;
