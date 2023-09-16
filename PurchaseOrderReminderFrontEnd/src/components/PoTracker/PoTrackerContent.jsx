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
    const [placementDateRange, setPlacementDateRange] = useState({
      startDate: "2000-01-01",
      endDate: "2100-12-31",
    })
    
    const [totalCostRange, setTotalCostRange] = useState({
      minCost: 0,
      maxCost: Infinity, // You can set this to a reasonable upper limit
    })

    const handlePlacementDateFilterChange = (e) => {
      setPlacementDateRange((prevDateRange) => ({
        ...prevDateRange,
        [e.target.name]: new Date(e.target.value),
      }))
      console.log(placementDateRange)
    }
    
    const handleTotalCostFilterChange = (minCost, maxCost) => {
      setTotalCostRange({ minCost, maxCost });
    }

    const calculateTotalCost = (lineitems) => {
      var totalPoValueAccumulator = 0
        lineitems.forEach(line => {
            totalPoValueAccumulator += line.price*line.quantity
        })
        return totalPoValueAccumulator
      }
    
    const filteredPoLines = poLines.filter((po) => {
      // Check if the placement date is within the specified range
      const placementDate = new Date(po.placed);
      const { startDate, endDate } = placementDateRange;
      if (startDate && endDate) {
        if (
          placementDate < startDate ||
          placementDate > endDate
        ) {
          return false // Filter out items not within the date range
        }
      }
    
      // Check if the total cost is within the specified range
      const totalCost = calculateTotalCost(po.lineitems)
      const { minCost, maxCost } = totalCostRange;
      if (totalCost < minCost || totalCost > maxCost) {
        return false; // Filter out items not within the cost range
      }
    
      return true // Include items that pass all filters
    })
    

    
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
                <Th>Placed Bottom of Range</Th>
                <Th>Placed Top of Range</Th>
                <Th>PO Number</Th>
                <Th>Description</Th>
                <Th>Supplier</Th>
                <Th>Total Cost Bottom</Th>
                <Th>Total Cost Top</Th>
                <Th>Currency</Th>
              </Tr>
              <Tr>
                <Td><Input placeholder='Start Date' name='startDate' value={placementDateRange.startDate} type='date' onChange={handlePlacementDateFilterChange} ></Input></Td>
                <Td><Input placeholder='End Date' name='endDate' value={placementDateRange.endDate} type='date' onChange={handlePlacementDateFilterChange} ></Input></Td>
                <Td><Input placeholder='PO Filter'></Input></Td>
                <Td><Input placeholder='Description Filter'></Input></Td>
                <Td><Input placeholder='Supplier Filter'></Input></Td>
                <Td><Input placeholder='Cost Filter Bottom'></Input></Td>
                <Td><Input placeholder='Cost Filter Top'></Input></Td>
                <Td><Input placeholder='Currency Filter'></Input></Td>
              </Tr>
            </Thead>
          </Table>
        </TableContainer>
        <Accordion allowMultiple>
          {
            filteredPoLines.map((lineItem, i) => 
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