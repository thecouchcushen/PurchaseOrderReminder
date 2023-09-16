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
    const [descriptionFilter, setDescriptionFilter] = useState('')
    const [supplierFilter, setSupplierFilter] = useState('')
    const [currencyFilter, setCurrencyFilter] = useState('')
    const [poNumberFilter, setPoNumberFilter] = useState('')
    
    const handleDescriptionFilterChange = (e) => {
      setDescriptionFilter(e.target.value)
    }
    
    const handleSupplierFilterChange = (e) => {
      setSupplierFilter(e.target.value)
    }
    
    const handleCurrencyFilterChange = (e) => {
      setCurrencyFilter(e.target.value)
    }
    
    const handlePoNumberFilterChange = (e) => {
      setPoNumberFilter(e.target.value)
    }
    

    const handlePlacementDateFilterChange = (e) => {
      setPlacementDateRange((prevDateRange) => ({
        ...prevDateRange,
        [e.target.name]: new Date(e.target.value),
      }))

      console.log(placementDateRange)
    }
    
    // Handle changes to the total cost filter. If the filter is empty, set the value to 0 or Infinity depending on if it is the minCost or maxCost input
    const handleTotalCostFilterChange = (e) => {
      if (e.target.value === "") {
        if (e.target.name === "minCost") {
          setTotalCostRange((prevCostRange) => ({
            ...prevCostRange,
            [e.target.name]: 0
          }))
          } else {
            setTotalCostRange((prevCostRange) => ({
              ...prevCostRange,
              [e.target.name]: Infinity
            }))
          }
        } else {
          setTotalCostRange((prevCostRange) => ({
            ...prevCostRange,
            [e.target.name]: e.target.value,
          }))
        }

      console.log(totalCostRange)
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
      const placementDate = new Date(po.placed)
      const { startDate, endDate } = placementDateRange
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
      const { minCost, maxCost } = totalCostRange
      if (totalCost < minCost || totalCost > maxCost) {
        return false // Filter out items not within the cost range
      }

      // Check if the PO description contains the filter text (case-insensitive)
      if (descriptionFilter && !po.podescription.toLowerCase().includes(descriptionFilter.toLowerCase())) {
        return false // Filter out items that don't match the description filter
      }

      // Check if the supplier contains the filter text (case-insensitive)
      if (supplierFilter && !po.supplier.toLowerCase().includes(supplierFilter.toLowerCase())) {
        return false // Filter out items that don't match the supplier filter
      }

      // Check if the currency contains the filter text (case-insensitive)
      if (currencyFilter && !po.currency.toLowerCase().includes(currencyFilter.toLowerCase())) {
        return false // Filter out items that don't match the currency filter
      }

      // Check if the PO number contains the filter text
      if (poNumberFilter && !po.ponumber.includes(poNumberFilter)) {
        return false // Filter out items that don't match the PO number filter
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
                <Td><Input placeholder='PO Filter' name='ponumber' value={poNumberFilter} onChange={handlePoNumberFilterChange}></Input></Td>
                <Td><Input placeholder='Description Filter' name='description' value={descriptionFilter} onChange={handleDescriptionFilterChange}></Input></Td>
                <Td><Input placeholder='Supplier Filter' name='supplier' value={supplierFilter} onChange={handleSupplierFilterChange}></Input></Td>
                <Td><Input placeholder='Minimum Cost' name='minCost' value={totalCostRange.minCost} type='number' onChange={handleTotalCostFilterChange}></Input></Td>
                <Td><Input placeholder='Maximum Cost' name='maxCost' value={totalCostRange.maxCost} type='number' onChange={handleTotalCostFilterChange}></Input></Td>
                <Td><Input placeholder='Currency Filter' name='currency' value={currencyFilter} onChange={handleCurrencyFilterChange}></Input></Td>
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