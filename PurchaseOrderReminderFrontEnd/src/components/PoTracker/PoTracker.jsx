import PoLineItemForm from './PoLineItemForm'
import PoLineItem from './PoLineItem'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    TableCaption,
    TableContainer,
    Center,
    Text
  } from '@chakra-ui/react'

const PoTracker = () => {
    const [poLines, setPoLines] = useState([])

    useEffect(() => {
      axios
      .get('http://localhost:3001/POlineitems')
      .then(response => {
        //console.log('promise fulfilled')
        setPoLines(response.data)
      })
    }, [])

    return (
        <>
    <Text
    bgGradient='linear(to-l, #7928CA, #FF0080)'
    bgClip='text'
    fontSize='6xl'
    fontWeight='extrabold'
    >
      PO Tracker
    </Text>
      <div className="card">
        <PoLineItemForm></PoLineItemForm>
      </div>
      <div className="card">
      <Center><h1>PO Line Items</h1></Center>
        <TableContainer>
          <Table>
            <TableCaption>Open Pos</TableCaption>
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
              <Tr>
                <Td><Input placeholder='PO Filter'></Input></Td>
                <Td><Input placeholder='SKU Filter'></Input></Td>
                <Td><Input placeholder='Description Filter'></Input></Td>
                <Td><Input placeholder='Supplier Filter'></Input></Td>
                <Td><Input placeholder='Quantity Filter'></Input></Td>
                <Td><Input placeholder='Price Filter'></Input></Td>
                <Td><Input placeholder='Price Filter'></Input></Td>
                <Td><Input placeholder='Currency Filter'></Input></Td>
              </Tr>
            </Thead>
            <Tbody>
              {
                poLines.map(lineItem => 
                  <PoLineItem 
                    line={lineItem} 
                    key={"LineNumber" + lineItem.id} 
                  />
                )
              }
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
    )

}

export default PoTracker