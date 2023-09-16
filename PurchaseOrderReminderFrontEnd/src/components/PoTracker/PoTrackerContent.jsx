/**
 * PoTrackerContent.jsx
 * Description: This component renders the content of the PO Tracker page, including the PO Line Items as well as the filters 
 * Author: Liam Cushen
 * Date: 2023-09-01
 */

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
//import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import PoLine from './PoLine'
import PropTypes from 'prop-types'
import polineitems from '../../services/polineitems'

const PoTrackerContent = (props) => {
    //Initialize state variables
    const [poLines, setPoLines] = useState([])
    const {handleEditPo} = props

    //Use axios to get the PO data from the backend
    useEffect(() => {
      polineitems.getAll().then(response => {
        setPoLines(response)
      })
    }, [])

    //Handle the delete button on each PO
    const handleDeletePo = (poIndex) => {
      polineitems.del(poIndex).then(() => {
        setPoLines(poLines.filter(po => po.id !== poIndex))
      })
    }

    //Render the PO Tracker Content
    //TODO: Implement filters
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
            poLines.map((lineItem, i) => 
              <PoLine 
                poToDisplay={lineItem} 
                key={"LineNumber" + lineItem.id} 
                handleEditPo={handleEditPo}
                handleDeletePo={() => handleDeletePo(i)}
              />
            )
          }
        </Accordion>
        </>
    )
}

PoTrackerContent.propTypes = {
  handleEditPo: PropTypes.func.isRequired,
}

export default PoTrackerContent