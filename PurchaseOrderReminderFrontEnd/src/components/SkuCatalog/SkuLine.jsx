import { 
    Tr,
    Td
  } from '@chakra-ui/react'

const SkuLine = (propObject) => {
    const skuToDisplay = propObject.sku
    return (
        <Tr>
            <Td>{skuToDisplay.sku}</Td>
            <Td>{skuToDisplay.name}</Td>
            <Td>{skuToDisplay.unit}</Td>
        </Tr>
    )
}

export default SkuLine