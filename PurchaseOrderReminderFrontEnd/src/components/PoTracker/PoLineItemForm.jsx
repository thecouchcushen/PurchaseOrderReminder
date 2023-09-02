import { 
    Table,
    Thead,
    Tbody,
    Td,
    Tr,
    Th,
    TableContainer,
    Box,
    Input,
    Button
  } from '@chakra-ui/react'

const PoLineItemForm = () => {


    return (

        <Box>
        <TableContainer>
        <Table>
            
            <Thead>
                <Tr>
                    <Th>PO Number</Th>
                    <Th>SKU</Th>
                    <Th>Description</Th>
                    <Th>Supplier</Th>
                    <Th>Quantity</Th>
                    <Th>Price</Th>
                    <Th>Currency</Th>
                    <Th>Due Date</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td><Input placeholder='PO'></Input></Td>
                    <Td><Input placeholder='SKU'></Input></Td>
                    <Td><Input placeholder='Description'></Input></Td>
                    <Td><Input placeholder='Supplier'></Input></Td>
                    <Td><Input placeholder='Quantity'></Input></Td>
                    <Td><Input placeholder='Price'></Input></Td>
                    <Td><Input placeholder='Currency'></Input></Td>
                    <Td><Input placeholder='Due Date'></Input></Td>
                    <Td><Button>Submit</Button></Td>
                </Tr>
            </Tbody>
            </Table>
            </TableContainer>
            

        </Box>

    )
}

export default PoLineItemForm