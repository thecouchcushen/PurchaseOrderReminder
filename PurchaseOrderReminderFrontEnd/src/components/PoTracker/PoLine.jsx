import { useEffect, useState } from "react"
import PoSkuLine from "./PoSkuLine"
import {
    Tr,
    Td,
    TableContainer,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Table,
    Tbody,
    Thead,
    Th,
    Button
} from '@chakra-ui/react'

const PoLine = (propsObject) => {
    const poToDisplay = propsObject.line
    const [poValue, setPoValue] = useState(0)

    useEffect(() => {
        var totalPoValueAccumulator = 0
        poToDisplay.lineitems.forEach(line => {
            totalPoValueAccumulator += line.price*line.quantity
        })
        setPoValue(totalPoValueAccumulator)
    }, [poToDisplay.lineitems])
    
    
    return (
        <AccordionItem>
          <h2>
            <AccordionButton>
              <TableContainer>
                <Table>
                  <Tbody>
                    <Tr>
                        <Td>{poToDisplay.placed}</Td>
                        <Td>{poToDisplay.ponumber}</Td>
                        <Td>{poToDisplay.supplier}</Td>
                        <Td>{poToDisplay.podescription}</Td>
                        <Td>{poValue}</Td>  
                        <Td>{poToDisplay.currency}</Td>  
                        <Td><Button>Edit</Button></Td>
                        
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <TableContainer>
              <Table>
                <Thead>
                    <Tr>
                        <Th>SKU</Th>
                        <Th>Quantity</Th>
                        <Th>Price</Th>
                        <Th>Due Date</Th>
                        <Th>Destination</Th>
                        <Th>Shipping Method</Th>
                        <Th>Arrival Date</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {poToDisplay.lineitems.map((skuLine, i ) => 
                        <PoSkuLine skuLine={skuLine} key={"PO"+poToDisplay.id+"SKULine"+i}/>
                    )}
                </Tbody>
              </Table>
            </TableContainer>
          </AccordionPanel>
        </AccordionItem>
        
    )
}

export default PoLine