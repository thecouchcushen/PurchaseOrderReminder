import PoLineItemForm from './PoLineItemForm'
import PoLine from './PoLine'
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
      .get('http://localhost:3001/pos')
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
                <Th>Placed</Th>
                <Th>PO Number</Th>
                <Th>Description</Th>
                <Th>Supplier</Th>
                <Th>Total Cost</Th>
                <Th>Currency</Th>
              </Tr>
              <Tr>
                <Td><Input placeholder='Placement Filter'></Input></Td>
                <Td><Input placeholder='PO Filter'></Input></Td>
                <Td><Input placeholder='Description Filter'></Input></Td>
                <Td><Input placeholder='Supplier Filter'></Input></Td>
                <Td><Input placeholder='Cost Filter'></Input></Td>
                <Td><Input placeholder='Currency Filter'></Input></Td>
              </Tr>
            </Thead>
            <Tbody>
              {
                poLines.map(lineItem => 
                  <PoLine 
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