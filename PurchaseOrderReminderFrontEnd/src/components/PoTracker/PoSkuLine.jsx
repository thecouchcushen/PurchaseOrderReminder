/**
 * PoSkuLine.jsx
 * Description: This component renders a single SKU from each Purchase Order in the PO tracker
 * Author: Liam Cushen
 * Date: 2023-09-01
 */

import {
    Tr,
    Td,
} from '@chakra-ui/react'
import PoSkuLineSku from './PoSkuLineSku'


const PoSkuLine = (propsObject) => {
    const skuToDisplay = propsObject.skuLine
    //Render the SKU Line
    return (
        <Tr>
            <PoSkuLineSku skuId={skuToDisplay.sku} />
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