import {
    Tr,
    Td,
} from '@chakra-ui/react'

const PoSkuLine = (propsObject) => {
    const skuToDisplay = propsObject.skuLine

    return (
        <Tr>
            <Td>{skuToDisplay.sku}</Td>
            <Td>{skuToDisplay.quantity}</Td>
            <Td>{skuToDisplay.price}</Td>
            <Td>{skuToDisplay.duedate}</Td>
            <Td>{skuToDisplay.destination}</Td>
            <Td>{skuToDisplay.shipmethod}</Td>
            <Td>Arrival Date</Td>
        </Tr>
    )
}

export default PoSkuLine