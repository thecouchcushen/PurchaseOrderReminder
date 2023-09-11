/**
 * Supplier.jsx
 * Description: This component renders a single line of the Supplier List
 * Author: Liam Cushen
 * Date: 2023-09-01
 */


import { 
    Tr,
    Td
  } from '@chakra-ui/react'

const SupplierLine = (propObject) => {
    const supplierToDisplay = propObject.supplier
    //Render the Supplier Line
    return (
        <Tr>
            <Td>{supplierToDisplay.name}</Td>
            <Td>{supplierToDisplay.deposit*100}%</Td>
            <Td>{supplierToDisplay.balance*100}%</Td>
            <Td>{supplierToDisplay.daysafterpickup} days</Td>
        </Tr>
    )
}

export default SupplierLine