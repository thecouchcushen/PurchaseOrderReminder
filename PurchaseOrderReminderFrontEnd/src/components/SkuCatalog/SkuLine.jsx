/**
 * SkuLine.jsx
 * Description: This component renders a single line of the SKU Catalog
 * Author: Liam Cushen
 * Date: 2023-09-01
 */


import { 
    Tr,
    Td
  } from '@chakra-ui/react'

const SkuLine = (propObject) => {
    const skuToDisplay = propObject.sku
    //Render the SKU Line
    return (
        <Tr>
            <Td>{skuToDisplay.sku}</Td>
            <Td>{skuToDisplay.name}</Td>
            <Td>{skuToDisplay.unit}</Td>
        </Tr>
    )
}

export default SkuLine