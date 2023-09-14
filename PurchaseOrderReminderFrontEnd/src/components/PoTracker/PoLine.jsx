/**
 * PoLine.jsx
 * Description: This component renders a single Purchase Order in the PO tracker, then calls each individual SKU from that Purchase Order
 * Author: Liam Cushen
 * Date: 2023-09-01
 */


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
import PropTypes from 'prop-types'

const PoLine = (props) => {
  
    const {handleEditPo, poToDisplay, handleDeletePo} = props
    
    //Initialize state variables
    const [poValue, setPoValue] = useState(0)

    //Calculate the total value of the PO
    useEffect(() => {
        var totalPoValueAccumulator = 0
        poToDisplay.lineitems.forEach(line => {
            totalPoValueAccumulator += line.price*line.quantity
        })
        setPoValue(totalPoValueAccumulator)
    }, [poToDisplay.lineitems])
    
    const onClickEdit = () => {
      //console.log(poToDisplay)
      handleEditPo(poToDisplay)
    }
    //Render the Purchase Order Line
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
                        <Td><Button onClick={onClickEdit}>Edit</Button></Td>
                        <Td><Button onClick={handleDeletePo}>Delete</Button></Td>
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

PoLine.propTypes = {
    handleEditPo: PropTypes.func,
    handleDeletePo: PropTypes.func,
    poToDisplay: PropTypes.shape({
        id: PropTypes.number,
        ponumber: PropTypes.string,
        placed: PropTypes.string,
        supplier: PropTypes.string,
        currency: PropTypes.string,
        podescription: PropTypes.string,
        lineitems: PropTypes.arrayOf(
            PropTypes.shape({
                fgmat: PropTypes.string,
                finalproduct: PropTypes.string,
                sku: PropTypes.string,
                description: PropTypes.string,
                quantity: PropTypes.number,
                price: PropTypes.number,
                duedate: PropTypes.string,
                destination: PropTypes.string,
                shipmethod: PropTypes.string,
                arrivaldate: PropTypes.string,
                status: PropTypes.string,
            })
        ),
    }),
}

export default PoLine