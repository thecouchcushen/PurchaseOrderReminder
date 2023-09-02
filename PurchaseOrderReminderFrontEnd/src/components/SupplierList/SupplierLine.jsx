import { 
    Tr,
    Td
  } from '@chakra-ui/react'

const SupplierLine = (propObject) => {
    const supplierToDisplay = propObject.supplier
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