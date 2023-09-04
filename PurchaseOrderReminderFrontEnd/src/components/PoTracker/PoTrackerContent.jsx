import { 
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Input,
    TableCaption,
    TableContainer,
    Center,
    Accordion,
    
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import PoLine from './PoLine'


const PoTrackerContent = () => {
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
          </Table>
        </TableContainer>
        <Accordion allowMultiple>
          {
            poLines.map(lineItem => 
              <PoLine 
                line={lineItem} 
                key={"LineNumber" + lineItem.id} 
              />
            )
          }
        </Accordion>
        </>
    )
}
export default PoTrackerContent