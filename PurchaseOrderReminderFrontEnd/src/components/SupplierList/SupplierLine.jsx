import { 
    Tr,
    Td
  } from '@chakra-ui/react'

const SupplierLine = (propObject) => {
    const supplierToDisplay = propObject.supplier
    return (
        <Tr>
            <Td>{supplierToDisplay.name}</Td>
            <Td>{supplierToDisplay.deposit}</Td>
            <Td>{supplierToDisplay.balance}</Td>
            <Td>{supplierToDisplay.daysafterpickup}</Td>
        </Tr>
    )
}

export default SupplierLine